# SENATOR backend

One job right now: receive an order from `checkout.html` and send a
formatted Telegram notification to the shop's bot. Will grow a LiqPay
payment-signing endpoint later without a rewrite - same pattern.

## Local development

```bash
cd backend
pip install -r requirements.txt
copy .env.example .env
# edit .env with real TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
python app.py
```

Server runs at `http://127.0.0.1:5000`. Check `GET /api/health` to confirm
the bot token loaded, then `POST /api/notify-order` with a JSON body
matching the shape `js/cart.js` stores in `sessionStorage` (`id`, `items`,
`total`, `contact`, `delivery`, `recipient`, `notes`).

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
6. Paste that URL into `js/cart.js` (the `ORDER_NOTIFY_URL` constant near
   the top of the file) so the checkout page actually calls it.

**Free tier note:** Render's free web services "spin down" after 15
minutes of no traffic and take ~30-50 seconds to wake up on the next
request. For an order-notification call this is usually fine (the
message arrives a little late, the checkout flow itself doesn't wait
on it), but if that delay ever becomes a problem, upgrade to a paid
instance or switch to a provider without a free-tier sleep (Railway,
Fly.io).

## Rotating the bot token

If the token ever leaks (posted somewhere public, etc.), message
@BotFather -> `/revoke` for that bot, get a new token, and update it in
Render's environment variables. Nothing else needs to change.
