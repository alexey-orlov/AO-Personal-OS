#!/usr/bin/env bash
# Re-export the live "Outbox flush (cloud)" n8n workflow to
# workflow-outbox-flush.json, stripping everything that must never
# reach the repo (CLAUDE.md hard rules):
#   - the Telegram group chat id      → REDACTED_GROUP_CHAT_ID
#   - any webhookId (live URL path)   → REDACTED_WEBHOOK_ID
#   - any Telegram bot token in a URL → REDACTED_BOT_TOKEN (regex, survives token rotation)
# Run after ANY edit to the workflow in n8n.
set -euo pipefail
cd "$(dirname "$0")"

WORKFLOW_ID="q8OQXe2gwMk4rOxN"
N8N_KEY="$(security find-generic-password -s N8N_API_KEY -w)"

curl -s -H "X-N8N-API-KEY: $N8N_KEY" \
  "https://alexorlovco.app.n8n.cloud/api/v1/workflows/${WORKFLOW_ID}" | python3 -c "
import json, re, sys

wf = json.load(sys.stdin)
out = {k: wf[k] for k in ('name', 'nodes', 'connections', 'settings') if k in wf}
s = json.dumps(out, indent=2, ensure_ascii=False)

chat_id = '$(security find-generic-password -s TELEGRAM_GROUP_CHAT_ID -w)'
s = s.replace(chat_id, 'REDACTED_GROUP_CHAT_ID')
s = re.sub(r'bot\d{8,12}:[A-Za-z0-9_-]{30,}', 'botREDACTED_BOT_TOKEN', s)

for n in out['nodes']:
    if 'webhookId' in n:
        s = s.replace(n['webhookId'], 'REDACTED_WEBHOOK_ID')

assert 'github_pat_' not in s, 'GitHub PAT leaked into export!'
assert re.search(r'bot\d{8,12}:', s) is None, 'Bot token leaked into export!'
assert chat_id not in s, 'Group chat id leaked into export!'

open('workflow-outbox-flush.json', 'w').write(s + '\n')
print('exported + redacted OK')
"
