"""
SENATOR order-notification backend.

One job: receive an order from the checkout page and send a formatted
message to the shop's Telegram bot. Kept deliberately tiny so the same
service can later grow a LiqPay payment-signing endpoint without a
rewrite (see /api/notify-order below for the pattern to copy).

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


def format_order_message(order):
    lines = [f"\U0001F4E6 <b>Новый заказ №{escape(order.get('id', '-'))}</b>", ""]

    lines.append("<b>Товары:</b>")
    for item in order.get("items", []):
        name = escape(item.get("name", "?"))
        size = escape(item.get("size", "-"))
        qty = item.get("qty", 1)
        price = item.get("lineTotal", 0)
        lines.append(f"• {name}, розмір {size} — {qty} шт. — {price:,} грн".replace(",", " "))
    lines.append("")

    total = order.get("total", 0)
    lines.append(f"\U0001F4B0 <b>Сумма: {total:,} грн</b>".replace(",", " "))
    lines.append("")

    contact = order.get("contact", {})
    lines.append("\U0001F464 <b>Покупатель</b>")
    lines.append(f"Имя: {escape(contact.get('name', '-'))}")
    lines.append(f"Телефон: {escape(contact.get('phone', '-'))}")
    lines.append(f"Email: {escape(contact.get('email', '-'))}")
    lines.append("")

    delivery = order.get("delivery", {})
    lines.append("\U0001F4CD <b>Доставка (Нова Пошта)</b>")
    lines.append(f"Город: {escape(delivery.get('city', '-'))}")
    lines.append(f"Отделение: №{escape(delivery.get('branch', '-'))}")
    lines.append("")

    recipient = order.get("recipient")
    if recipient:
        lines.append(f"\U0001F381 <b>Получатель:</b> {escape(recipient.get('name', '-'))}, {escape(recipient.get('phone', '-'))}")
    else:
        lines.append("\U0001F381 <b>Получатель:</b> заказ для себя")

    notes = order.get("notes", "").strip()
    if notes:
        lines.append("")
        lines.append(f"\U0001F4DD <b>Примечание:</b> {escape(notes)}")

    return "\n".join(lines)


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


@app.route("/api/notify-order", methods=["POST", "OPTIONS"])
def notify_order():
    if request.method == "OPTIONS":
        return "", 204

    if ORDER_API_KEY and request.headers.get("X-API-Key") != ORDER_API_KEY:
        return jsonify({"ok": False, "error": "unauthorized"}), 401

    order = request.get_json(silent=True)
    if not order:
        return jsonify({"ok": False, "error": "invalid or missing JSON body"}), 400

    try:
        message = format_order_message(order)
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
