# SENATOR backend

The site has no online sale - a manager always calls the client back. This
backend's one job: receive a phone-consultation request from
`consultation.html` and send a formatted Telegram notification to the
shop's bot.

## Local development

```bash
cd backend
pip install -r requirements.txt
copy .env.example .env
# edit .env with real TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
python app.py
```

Server runs at `http://127.0.0.1:5000`. Check `GET /api/health` to confirm
the bot token loaded, then `POST /api/notify-lead` with a JSON body matching
the shape `js/leads.js` sends: `{"type": "consultation", "name", "phone",
"preferredTime", "product", "website"}`. `product` is empty unless the
visitor came from a product page; `website` is the honeypot and must stay
empty for the lead to be forwarded.

## Deploying to Render (free tier)

1. Go to [render.com](https://render.com), sign up (GitHub login is fastest).
2. **New +** -> **Blueprint** -> connect the `senator-website` GitHub repo.
   Render reads `render.yaml` in the repo root and pre-fills everything
   (root directory `backend`, build/start commands, free plan).
3. When prompted for environment variables, fill in:
   - `TELEGRAM_BOT_TOKEN` - the token from @BotFather
   - `TELEGRAM_CHAT_ID` - the chat/group id to notify
   - `ALLOWED_ORIGIN` is already set to the GitHub Pages URL in
     `render.yaml`; change it if the site moves to a custom domain.
4. Deploy. Render gives a URL like `https://senator-backend.onrender.com`.
5. Test it: `curl https://senator-backend.onrender.com/api/health` should
   return `{"ok": true, "configured": true}`.
6. Paste that URL into `js/leads.js` (the `LEAD_NOTIFY_URL` constant near
   the top of the file) so the consultation form actually calls it.

**Free tier note:** Render's free web services "spin down" after 15
minutes of no traffic and take ~30-50 seconds to wake up on the next
request. The form *does* wait for the backend to confirm it took the lead -
it must, or a failed request would be reported to the customer as a success -
so a cold start is a cold start the customer sits through. To avoid it,
`.github/workflows/keep-backend-awake.yml` pings `/api/health` every ten
minutes and keeps the instance warm. GitHub disables scheduled workflows in
a repository with no activity for 60 days; re-enable it from the Actions tab
if the site goes quiet for that long.

## Rotating the bot token

If the token ever leaks (posted somewhere public, etc.), message
@BotFather -> `/revoke` for that bot, get a new token, and update it in
Render's environment variables. Nothing else needs to change.
