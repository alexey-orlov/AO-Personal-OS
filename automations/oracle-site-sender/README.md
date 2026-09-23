# oracle-site-sender — Alex's deployment of the Oracle mini-site's email sender

The Oracle AI & Data Solutions mini-site (`~/Documents/GitHub/Oracle-Solutions-Site`) sends real email from its three forms since its round 12 (2026-09-23). The site repo holds the logic, the words, the links and the contract, and is shared with other people: its `mail/README.md` is the manual. **This page holds what is Alex's own and must not enter that repo:** which n8n, which credentials, which addresses, where alerts land.

## The deployment

| What | Value |
|---|---|
| Runs on | Alex's n8n cloud (the account behind the `n8n-mcp` connector) |
| Workflow | **Oracle site forms (cloud)**, id `co9bpWm6xVIPMfcB`: 26 steps, triggers *Form POST* (webhook) and *Every 6 hours* (self-check) |
| Backstop | **Oracle site forms — error alerts**, id `ih0qkEs5xOgpH2Kd`, set as the workflow's Error Workflow |
| Reads | `alexey-orlov/Oracle-Solutions-Site`, branch `main`, through the credential **GitHub read (Oracle-Solutions-Site)** (`TQydtFbGBrgfZg4W`): a fine-grained token with read-only Contents on that repo only, expiring 2027-09-23 |
| Sends | through **SMTP (alexorlov.co)** (`aysudzVRCnW5L1wc`): Zoho EU, `smtp.zoho.eu:465` with SSL, user alex@alexorlov.co, with a Zoho app password. On Zoho's free plan the host is `smtp.zoho.eu`, not `smtppro`, which answers `554 5.7.8 Access Restricted` (first test, 2026-09-23) |
| From | Alex Orlov <alex@alexorlov.co> |
| Test inbox | olekorlov@softserveinc.com: every practice notice and every kit reply while the repo's `mail/settings.json` says `"mode": "test"` |
| Alerts | Telegram, the AO Personal OS group, General topic, through **Telegram bot (AO)** (`FnBXEhAZd1GlsgSP`) |
| Allowed origins | `http://127.0.0.1:8765`, `http://localhost:8765` (the local preview), `http://127.0.0.1:8767`, `http://localhost:8767` (the second preview, `oracle-site-alt`) |

These values live in the workflow's **Deployment settings** step and in `Oracle-Solutions-Site/.work/n8n/deployment.local.json` on this Mac (git-ignored), from which `node tools/n8n-workflow.js` builds the full workflow. The webhook path is a live trigger URL: it lives only in `.work/n8n/webhook-path.txt` on this Mac and in n8n itself (read it back through the n8n connector). It never goes in git, here or there.

## Why this sender, and what replaces it

- **Why not Alex's SoftServe mailbox:** SoftServe's Azure AD requires admin approval for the n8n cloud app. Microsoft showed "Need admin approval" on 2026-09-23. An unconnected credential, **Outlook (SoftServe)**, is left over from that attempt and can be deleted.
- **Why a non-SoftServe From line is temporary:** softserveinc.com enforces DMARC `p=quarantine`, so only SoftServe's own Microsoft 365 can send as a softserveinc.com address. A cold reader of the first kit email found a sender outside SoftServe's domain untrustworthy.
- **The real integration:** a SoftServe app registration with Microsoft Graph `Mail.Send`, scoped by an application access policy to oracle@softserveinc.com. Then either swap the two SMTP steps for Graph HTTP steps, or run the contract elsewhere (the site repo's `mail/README.md`, "Replacing the sender"). That needs an IT request.

## Operating it

- **To test locally:** start the site preview (`preview_start {name: "oracle-site"}`, or `python3 tools/serve.py` in the site repo) and open http://127.0.0.1:8765 in any browser on this Mac. The forms read the endpoint from the site repo's `site/data/endpoint.local.json`, which is git-ignored and never published. It holds `{ "formEndpoint": "<instance URL>/webhook/<the path>" }` and was written on 2026-09-24 from `.work/n8n/webhook-path.txt`. Every test send is real: in test mode the practice copy, and any kit to an allowed address, arrive in the test inbox.
- **To go live:** the repo's `mail/settings.json` `mode`, and a public host whose origin is added to the workflow's allowed origins.
- **After a change to a Code step** in the site repo's `mail/n8n/`: run `node tools/n8n-workflow.js`, then push `.work/n8n/workflow.live.json` (full) or `.work/n8n/code-nodes.json` (code only) to the workflow through the n8n connector.
- **Executions** keep the requests' data for as long as the n8n plan retains it.
