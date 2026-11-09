#!/usr/bin/env python3
"""transcribe.py <audio_file> <output_dir>  — prints the transcript path."""
import os
import shutil
import subprocess
import sys
import tempfile

import assemblyai as aai
import httpx

AFCONVERT = shutil.which("afconvert") or "/usr/bin/afconvert"


# 2026-11-09: AssemblyAI reset one recording's upload on four tries in a row
# while a same-size recording went through, and an afconvert copy uploaded at
# once. Only the upload is retried, so a transcription job is never submitted
# twice. The copy lives in a temporary folder under work_dir (.work/), never
# beside the input, which can be the Voice Memos folder the watcher scans.
def upload(transcriber: aai.Transcriber, audio_file: str, work_dir: str) -> str:
    try:
        return transcriber.upload_file(audio_file)
    except httpx.TransportError as e:
        sys.stderr.write(f"[transcribe] upload failed ({type(e).__name__}: {e}); retrying with a re-encoded copy\n")
    with tempfile.TemporaryDirectory(dir=work_dir) as tmp:
        copy = os.path.join(tmp, "reencoded.m4a")
        subprocess.run([AFCONVERT, "-f", "m4af", "-d", "aac", "-b", "48000", audio_file, copy], check=True)
        return transcriber.upload_file(copy)


def main() -> int:
    if len(sys.argv) != 3:
        sys.stderr.write("usage: transcribe.py <audio_file> <output_dir>\n")
        return 2
    audio_file, out_dir = sys.argv[1], sys.argv[2]

    key = os.environ.get("ASSEMBLYAI_API_KEY", "").strip()
    if not key:
        sys.stderr.write("ASSEMBLYAI_API_KEY is not set.\n")
        return 2
    aai.settings.api_key = key
    if os.environ.get("USE_EU_ENDPOINT") == "1":
        aai.settings.base_url = "https://api.eu.assemblyai.com"

    config = aai.TranscriptionConfig(
        speech_models=["universal-3-pro", "universal-2"],
        language_detection=True,
        speaker_labels=True,
    )
    os.makedirs(out_dir, exist_ok=True)
    transcriber = aai.Transcriber()
    audio_url = upload(transcriber, audio_file, out_dir)
    transcript = transcriber.transcribe(audio_url, config=config)
    if transcript.status == aai.TranscriptStatus.error:
        sys.stderr.write(f"Transcription failed: {transcript.error}\n")
        return 1

    base = os.path.splitext(os.path.basename(audio_file))[0]
    txt_path = os.path.join(out_dir, base + ".txt")
    with open(txt_path, "w", encoding="utf-8") as f:
        lang = getattr(transcript, "json_response", {}).get("language_code")
        if lang:
            f.write(f"[detected language: {lang}]\n\n")
        if transcript.utterances:
            for u in transcript.utterances:
                f.write(f"Speaker {u.speaker}: {u.text}\n")
        else:
            f.write(transcript.text or "")
    print(txt_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
