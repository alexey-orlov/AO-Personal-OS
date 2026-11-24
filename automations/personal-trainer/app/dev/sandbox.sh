#!/usr/bin/env bash
# Engine sandbox for testing the app against trainer.py: copies gym.json and history.json into a temp
# dir and prints the TRAINER_* exports, so `trainer.py feedback / ingest / gym` (which write gym.json,
# history.json and plans/) touch only the copies. All three variables together, never one of them:
# 2026-11-23 a test that set only TRAINER_PLANS let `feedback` mark two machines "have" in the real gym.json.
#
#   eval "$(automations/personal-trainer/app/dev/sandbox.sh)"
#   python3 automations/personal-trainer/trainer.py feedback 2026-11-24 < fb.json
set -euo pipefail
ENGINE="$(cd "$(dirname "$0")/../.." && pwd)"
D="$(mktemp -d "${TMPDIR:-/tmp}/trainer-sandbox.XXXXXX")"
mkdir -p "$D/plans"
cp "$ENGINE/gym.json" "$D/gym.json"
cp "$ENGINE/data/history.json" "$D/history.json"
printf "export TRAINER_PLANS='%s' TRAINER_GYM='%s' TRAINER_HISTORY='%s'\n" "$D/plans" "$D/gym.json" "$D/history.json"
