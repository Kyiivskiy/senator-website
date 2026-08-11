"""
SENATOR lead-notification backend.

One job: receive a fitting-booking or phone-consultation request from
the site and send a formatted message to the shop's Telegram bot. The
site has no online sale (no cart, no payment) - a manager always calls
the client back, so this is the entire "order" pipeline.

Environment variables (set in the hosting platform's dashboard, never
committed to git):
  TELEGRAM_BOT_TOKEN  - token from @BotFather
  TELEGRAM_CHAT_ID    - chat/group id to notify (see README in this folder)
  ALLOWED_ORIGIN      - the site's origin, e.g. https://kyiivskiy.github.io
                         (restricts who can call this endpoint)

Run locally:
  pip install -r requirements.txt
  copy .env.example .env   (fill in real values, this file is gitignored)
  python app.py
"""

import os
import urllib.request
import urllib.parse
import json

from flask import Flask, request, jsonify

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = Flask(__name__)

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")
ORDER_API_KEY = os.environ.get("ORDER_API_KEY", "")


def send_telegram_message(text):
    if not BOT_TOKEN or not CHAT_ID:
        raise RuntimeError("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured")

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = urllib.parse.urlencode({
        "chat_id": CHAT_ID,
        "parse_mode": "HTML",
        "text": text,
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, method="POST")
    with urllib.request.urlopen(req, timeout=10) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        if not body.get("ok"):
            raise RuntimeError(f"Telegram API error: {body}")


def format_lead_message(lead):
    lead_type = lead.get("type")
    name = escape(lead.get("name", "-"))
    phone = escape(lead.get("phone", "-"))
    preferred_time = escape(lead.get("preferredTime", "-"))

    if lead_type == "fitting":
        lines = ["\U0001F4C5 <b>Новая заявка на примерку</b>", ""]
        lines.append(f"\U0001F464 Имя: {name}")
        lines.append(f"\U0001F4DE Телефон: {phone}")
        lines.append(f"\U0001F552 Удобное время: {preferred_time}")
        product = lead.get("product", "").strip()
        lines.append(f"\U0001F454 Интересует: {escape(product) if product else 'не указано'}")
        return "\n".join(lines)

    if lead_type == "consultation":
        lines = ["\U0001F4DE <b>Заявка на консультацию по телефону</b>", ""]
        lines.append(f"\U0001F464 Имя: {name}")
        lines.append(f"\U0001F4DE Телефон: {phone}")
        lines.append(f"\U0001F552 Удобное время звонка: {preferred_time}")
        return "\n".join(lines)

    raise ValueError(f"unknown lead type: {lead_type!r}")


def escape(value):
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-API-Key"
    return response


@app.route("/api/notify-lead", methods=["POST", "OPTIONS"])
def notify_lead():
    if request.method == "OPTIONS":
        return "", 204

    if ORDER_API_KEY and request.headers.get("X-API-Key") != ORDER_API_KEY:
        return jsonify({"ok": False, "error": "unauthorized"}), 401

    lead = request.get_json(silent=True)
    if not lead:
        return jsonify({"ok": False, "error": "invalid or missing JSON body"}), 400

    try:
        message = format_lead_message(lead)
        send_telegram_message(message)
    except Exception as exc:
        return jsonify({"ok": False, "error": str(exc)}), 500

    return jsonify({"ok": True})


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "configured": bool(BOT_TOKEN and CHAT_ID)})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
