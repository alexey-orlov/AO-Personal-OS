#!/usr/bin/env python3
"""Clockify Button Panel — local server.

A zero-dependency (stdlib only) HTTP server that fronts a 4-button time-tracking
panel for Clockify. The API key lives in the environment (read from macOS
Keychain by run.sh) and NEVER reaches the browser; the browser only talks to
this local server, which proxies to the Clockify API.

State-mismatch protection is the whole point of this design:
  * Every mutating action (toggle / description) re-reads the LIVE in-progress
    entry from Clockify first, and acts on that real state + real entry id.
    There is no client-supplied entry id that can go stale.
  * A single global lock serializes all mutating ops so two clicks can't
    interleave a start/stop.
  * Every response carries the freshly-fetched state, so the UI always
    converges to truth.

Endpoints:
  GET  /                 -> index.html
  GET  /api/state        -> { ok, active|null, projects }
  POST /api/toggle       -> { projectKey } ; start/stop/switch, returns state
  POST /api/description  -> { description } ; update running entry, returns state
"""

import json
import os
import sys
import threading
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

API_BASE = "https://api.clockify.me/api/v1"
# The four project keys we expose, in button order. Matched by exact project
# name in the workspace.
PROJECT_KEYS = ["SS", "GC", "JS", "EF"]

HERE = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(HERE, "index.html")

API_KEY = os.environ.get("CLOCKIFY_API_KEY", "").strip()
PORT = int(os.environ.get("PORT", "7878"))

# Serializes all mutating Clockify operations (start/stop/switch/describe).
_mutate_lock = threading.Lock()


class ClockifyError(Exception):
    """A Clockify API call failed; message is safe to surface to the UI."""


class Clockify:
    """Thin Clockify REST client over urllib. Caches workspace/user/projects."""

    def __init__(self, api_key):
        if not api_key:
            raise ClockifyError(
                "CLOCKIFY_API_KEY is not set. Run setup.sh / source config.sh."
            )
        self.api_key = api_key
        self._ws = None
        self._uid = None
        self._projects = None  # list of {key,name,id,color}
        self._projects_lock = threading.Lock()

    # ---- low-level request -------------------------------------------------
    def _request(self, method, path, body=None):
        url = API_BASE + path
        data = None
        headers = {"X-Api-Key": self.api_key}
        if body is not None:
            data = json.dumps(body).encode("utf-8")
            headers["Content-Type"] = "application/json"
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                raw = resp.read()
                if not raw:
                    return None
                return json.loads(raw)
        except urllib.error.HTTPError as e:
            detail = ""
            try:
                detail = e.read().decode("utf-8", "replace")[:300]
            except Exception:
                pass
            raise ClockifyError(f"Clockify {method} {path} -> HTTP {e.code}. {detail}")
        except urllib.error.URLError as e:
            raise ClockifyError(f"Network error reaching Clockify: {e.reason}")
        except json.JSONDecodeError:
            raise ClockifyError(f"Clockify returned non-JSON for {method} {path}.")

    # ---- identity / projects (cached) -------------------------------------
    def _ensure_identity(self):
        if self._ws and self._uid:
            return
        user = self._request("GET", "/user")
        self._uid = user.get("id")
        self._ws = user.get("activeWorkspace") or user.get("defaultWorkspace")
        if not self._ws or not self._uid:
            raise ClockifyError("Could not resolve workspace/user from /user.")

    def projects(self, force=False):
        """Return [{key,name,id,color}] for our four keys (cached)."""
        with self._projects_lock:
            if self._projects is not None and not force:
                return self._projects
            self._ensure_identity()
            page = 1
            by_name = {}
            while True:
                rows = self._request(
                    "GET",
                    f"/workspaces/{self._ws}/projects"
                    f"?page-size=200&page={page}&archived=false",
                )
                if not rows:
                    break
                for p in rows:
                    by_name[p.get("name")] = p
                if len(rows) < 200:
                    break
                page += 1
            result = []
            for key in PROJECT_KEYS:
                p = by_name.get(key)
                if not p:
                    # Keep the button present but flagged; toggling will error.
                    result.append({"key": key, "name": key, "id": None, "color": "#555"})
                else:
                    result.append(
                        {
                            "key": key,
                            "name": p.get("name"),
                            "id": p.get("id"),
                            "color": p.get("color") or "#555",
                        }
                    )
            self._projects = result
            return result

    def _key_for_project_id(self, project_id):
        for p in self.projects():
            if p["id"] and p["id"] == project_id:
                return p["key"]
        return None

    def _project_by_key(self, key):
        for p in self.projects():
            if p["key"] == key:
                return p
        return None

    # ---- live state --------------------------------------------------------
    def in_progress(self):
        """Return the raw running time-entry dict, or None."""
        self._ensure_identity()
        rows = self._request(
            "GET",
            f"/workspaces/{self._ws}/user/{self._uid}/time-entries?in-progress=true",
        )
        if not rows:
            return None
        return rows[0]  # at most one expected; take first defensively

    def state(self):
        """{ ok, active|null, projects } — the canonical snapshot for the UI."""
        projects = self.projects()
        entry = self.in_progress()
        active = None
        if entry:
            interval = entry.get("timeInterval") or {}
            active = {
                "key": self._key_for_project_id(entry.get("projectId")),
                "projectId": entry.get("projectId"),
                "entryId": entry.get("id"),
                "description": entry.get("description") or "",
                "start": interval.get("start"),
            }
        return {"ok": True, "active": active, "projects": projects}

    # ---- mutations ---------------------------------------------------------
    def _stop_running(self):
        """Stop whatever is running (idempotent). 404 == nothing running."""
        try:
            self._request(
                "PATCH",
                f"/workspaces/{self._ws}/user/{self._uid}/time-entries",
                {"end": _now_iso()},
            )
        except ClockifyError as e:
            # No entry in progress -> Clockify returns 404; that's fine.
            if "HTTP 404" not in str(e):
                raise

    def _start(self, project_id, description=""):
        body = {"start": _now_iso(), "projectId": project_id}
        if description:
            body["description"] = description
        self._request("POST", f"/workspaces/{self._ws}/time-entries", body)

    def toggle(self, key):
        """Decide from LIVE truth, not from client state."""
        target = self._project_by_key(key)
        if not target or not target["id"]:
            raise ClockifyError(f"Project '{key}' not found in workspace.")
        with _mutate_lock:
            self._ensure_identity()
            entry = self.in_progress()
            running_pid = entry.get("projectId") if entry else None
            if running_pid == target["id"]:
                # Same project running -> stop (toggle off).
                self._stop_running()
            elif running_pid:
                # Different project running -> switch: stop then start.
                self._stop_running()
                self._start(target["id"])
            else:
                # Nothing running -> start.
                self._start(target["id"])
            return self.state()

    def set_description(self, description):
        with _mutate_lock:
            self._ensure_identity()
            entry = self.in_progress()
            if not entry:
                raise ClockifyError("No active tracker to attach a description to.")
            entry_id = entry.get("id")
            interval = entry.get("timeInterval") or {}
            # PUT requires the full entry body; preserve everything, change desc.
            body = {
                "start": interval.get("start"),
                "billable": entry.get("billable", True),
                "description": description,
                "projectId": entry.get("projectId"),
                "taskId": entry.get("taskId"),
                "tagIds": entry.get("tagIds") or [],
            }
            # Drop nulls Clockify dislikes (taskId null is fine, but be clean).
            body = {k: v for k, v in body.items() if v is not None or k == "description"}
            self._request(
                "PUT", f"/workspaces/{self._ws}/time-entries/{entry_id}", body
            )
            return self.state()


def _now_iso():
    """UTC ISO-8601 with a trailing Z, seconds precision (Clockify's format)."""
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


# Single shared client instance.
client = Clockify(API_KEY) if API_KEY else None


class Handler(BaseHTTPRequestHandler):
    server_version = "ClockifyPanel/1.0"

    def log_message(self, fmt, *args):  # quieter logs
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    # ---- helpers -----------------------------------------------------------
    def _send_json(self, obj, code=200):
        payload = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def _read_json_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if not length:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw or b"{}")
        except json.JSONDecodeError:
            return {}

    def _guard_client(self):
        if client is None:
            self._send_json(
                {"ok": False, "error": "Server has no CLOCKIFY_API_KEY configured."},
                code=500,
            )
            return False
        return True

    # ---- routes ------------------------------------------------------------
    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        if path == "/" or path == "/index.html":
            self._serve_index()
        elif path == "/api/state":
            if not self._guard_client():
                return
            try:
                self._send_json(client.state())
            except ClockifyError as e:
                self._send_json({"ok": False, "error": str(e)}, code=502)
        else:
            self.send_error(404, "Not found")

    def do_POST(self):
        path = urllib.parse.urlparse(self.path).path
        if not self._guard_client():
            return
        body = self._read_json_body()
        try:
            if path == "/api/toggle":
                key = (body.get("projectKey") or "").strip()
                if key not in PROJECT_KEYS:
                    self._send_json(
                        {"ok": False, "error": f"Unknown projectKey '{key}'."},
                        code=400,
                    )
                    return
                self._send_json(client.toggle(key))
            elif path == "/api/description":
                desc = body.get("description")
                if desc is None:
                    desc = ""
                self._send_json(client.set_description(str(desc)))
            else:
                self.send_error(404, "Not found")
        except ClockifyError as e:
            # Errors never lie: report the failure; the UI re-fetches truth.
            self._send_json({"ok": False, "error": str(e)}, code=502)

    def _serve_index(self):
        try:
            with open(INDEX_PATH, "rb") as f:
                html = f.read()
        except OSError:
            self.send_error(500, "index.html missing")
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(html)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(html)


def main():
    if client is None:
        sys.stderr.write(
            "WARNING: CLOCKIFY_API_KEY not set — the panel will load but all "
            "API calls will fail. Source config.sh first.\n"
        )
    else:
        # Warm the project cache early so the first /api/state is fast and any
        # auth problem surfaces in the log at startup.
        try:
            client.projects(force=True)
        except ClockifyError as e:
            sys.stderr.write(f"Startup project fetch failed: {e}\n")
    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    sys.stderr.write(f"Clockify panel on http://localhost:{PORT}\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()


if __name__ == "__main__":
    main()
