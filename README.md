# Endless, Beloved

Dark fantasy tarot romance visual novel — pure HTML/CSS/JS.

## Running locally
Open `index.html` in a browser. That's it.

## Building the APK
1. Push this repo to GitHub
2. Add these secrets in Settings → Secrets → Actions:
   - `KEYSTORE_BASE64` — your keystore file, base64 encoded
   - `KEYSTORE_PASSWORD`
   - `KEY_ALIAS`
   - `KEY_PASSWORD`
3. Push to `main` — GitHub Actions builds and uploads the APK automatically.

## Project structure
- `js/systems/` — core game systems (state, saves, dialogue, spells, skills)
- `js/ui/`      — screen components (main menu, game, route select)
- `css/`        — all styling
- `data/`       — characters, spells, skills JSON
- `story/`      — dialogue chapters per route
- `art/`        — character portraits and UI assets
- `android/`    — WebView wrapper for APK packaging

## App variant
To switch to the therapeutic (Heal) version, open `js/systems/AppVariant.js`
and change `'standard'` to `'heal'`.
