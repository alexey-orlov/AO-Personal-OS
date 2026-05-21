#!/usr/bin/env python3
"""transcribe.py <audio_file> <output_dir>  — prints the transcript path."""
import os
import sys

import assemblyai as aai


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
    transcript = aai.Transcriber().transcribe(audio_file, config=config)
    if transcript.status == aai.TranscriptStatus.error:
        sys.stderr.write(f"Transcription failed: {transcript.error}\n")
        return 1

    os.makedirs(out_dir, exist_ok=True)
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
