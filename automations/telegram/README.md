# telegram — standalone messenger CLI

Generic Telegram delivery for any AO-Personal-OS skill, automation, or hook. Pipe text to stdin; it posts to your configured Telegram chat. Knows nothing about call-pipeline, coaching, or any specific domain — just sends text.

## Setup (one-time)

```
./setup.sh
```

Prints a BotFather walkthrough if unconfigured, or `Telegram configured.` if both Keychain entries are already in place.

Credentials live in macOS Keychain under `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. They are read fresh on every `telegram_send.sh` invocation, so updates take effect immediately (no daemon reload needed for one-shot scripts; the call-pipeline watcher is the exception — see setup.sh step 6).

## Usage

```
echo "hello from AO-Personal-OS" | ./telegram_send.sh
cat message.txt                  | ./telegram_send.sh
{ echo "Daily summary:"; ./gen.sh; } | ./telegram_send.sh
```

## Behaviour

- Reads message text from stdin (a single message — no batching).
- Sends to the configured chat with `disable_web_page_preview=true`, so URLs in the body don't render giant preview cards on the phone.
- Truncates at 4000 chars as a failsafe (Telegram caps `sendMessage` at 4096).
- Exit 0 on success, 1 on any failure (unconfigured / empty stdin / HTTP error / API error). Callers should treat failure as non-fatal and continue.

## Files

- `telegram_send.sh` — the CLI.
- `config.sh` — reads `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` from Keychain (env-var fallback for ad-hoc overrides).
- `setup.sh` — one-time configuration walkthrough.
