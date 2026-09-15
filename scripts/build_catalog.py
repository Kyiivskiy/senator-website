import glob
import json
import os

from typography import fix_html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT, "data", "products.json")

with open(DATA_PATH, encoding="utf-8") as f:
    PRODUCTS = json.load(f)

PRODUCT_PLACEHOLDER_SVG = (
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">'
    '<path d="M18 10h12l3 6h5l-2 26H12L10 16h5l3-6z"/>'
    '<path d="M18 10a6 6 0 0 0 12 0"/>'
    "</svg>"
)

HEAD = """<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>СЕНАТОР - чоловіча класика у Миколаєві</title>
<meta name="description" content="Салон чоловічої класики у Миколаєві. Офіційний представник HERMOSE в Україні. Костюми, піджаки, брюки та сорочки. Персональний підбір образу.">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css?v=60">
</head>
<body>

<a class="skip-link" href="#main">Перейти до основного змісту</a>

<div class="header-group" id="header-group">
<div class="top-bar">
  <div class="shell top-bar-inner">
    <div class="top-bar-contacts">
      <span class="top-bar-item top-bar-phones"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg><a href="tel:+380631840915">+38 (063) 184-09-15</a><span class="top-bar-sep" aria-hidden="true">·</span><a href="tel:+380933835654">+38 (093) 383-56-54</a></span>
      <a class="top-bar-item top-bar-address" href="https://www.google.com/maps/search/?api=1&#38;query=%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B0+%D0%9C%D0%BE%D1%80%D1%81%D1%8C%D0%BA%D0%B0+69%D0%B0+%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2" target="_blank" rel="noopener noreferrer"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg> м. Миколаїв, вул. Велика Морська 69А, 54001</a>
    </div>
    <div class="top-bar-social">
      <a href="https://www.instagram.com/senator_hermose_mikolaiv_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><g transform="translate(0,512) scale(0.1,-0.1)"><path d="M1296 4674 c-438 -87 -768 -419 -851 -857 -23 -119 -23 -2395 0 -2514 84 -441 417 -774 858 -858 119 -23 2395 -23 2515 0 440 84 773 417 857 858 23 119 23 2395 0 2514 -73 386 -349 703 -714 822 -159 52 -135 51 -1410 50 -959 -1 -1199 -3 -1255 -15z m2489 -773 c82 -37 125 -103 125 -191 0 -124 -85 -211 -206 -212 -184 -2 -282 211 -161 349 61 69 161 92 242 54z m-1115 -281 c172 -20 344 -82 487 -177 76 -50 194 -162 255 -243 64 -84 152 -263 178 -365 66 -257 42 -502 -74 -740 -63 -129 -125 -214 -227 -310 -317 -300 -784 -375 -1176 -190 -121 57 -192 105 -282 190 -102 96 -163 181 -227 310 -205 418 -118 908 218 1231 113 108 207 169 354 227 161 64 327 86 494 67z"/><path d="M2420 3184 c-111 -23 -224 -86 -311 -173 -251 -252 -252 -650 0 -901 253 -252 651 -253 901 -1 253 254 253 648 0 902 -155 156 -374 220 -590 173z"/></g></svg></a>
    </div>
  </div>
</div>

<header class="site-header" id="site-header">
  <div class="shell header-inner">
    <a class="wordmark-link" href="index.html">
      <span class="wordmark">СЕНАТОР</span>
    </a>

    <nav class="main-nav" aria-label="Основна навігація">
      <a href="catalog.html">Каталог</a>
      <a href="index.html#salon">Про салон</a>
      <a href="index.html#visit">Контакти</a>
    </nav>

    <div class="header-actions">
      <a class="btn btn-solid header-cta" href="consultation.html">ОНЛАЙН-КОНСУЛЬТАЦІЯ</a>
      <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">
        <span></span><span></span><span></span>
        <span class="sr-only">Меню</span>
      </button>
    </div>
  </div>
</header>
</div>

<div class="mobile-nav" id="mobile-nav">
  <nav aria-label="Мобільна навігація">
    <a href="catalog.html">Каталог</a>
    <a href="index.html#salon">Про салон</a>
    <a href="index.html#visit">Контакти</a>
    <a class="mobile-nav-cta" href="consultation.html">ОНЛАЙН-КОНСУЛЬТАЦІЯ</a>
  </nav>
  <div class="mobile-nav-phones">
    <a href="tel:+380631840915">+380 63 184 09 15</a>
    <a href="tel:+380933835654">+380 93 383 56 54</a>
  </div>
</div>

<main id="main">
"""

FOOTER = """
</main>

<footer class="site-footer">
  <div class="shell">
    <p class="footer-wordmark">СЕНАТОР</p>
    <div class="footer-row">
      <p class="footer-tagline">Статус не проголошують. Його носять.</p>
      <div class="footer-meta">
        <span>© 2026 СЕНАТОР</span>
        <a href="tel:+380631840915">+380 63 184 09 15</a>
        <a href="tel:+380933835654">+380 93 383 56 54</a>
        <a href="privacy.html">Конфіденційність</a>
        <a href="https://www.instagram.com/senator_hermose_mikolaiv_/" target="_blank" rel="noopener noreferrer">INSTAGRAM <span aria-hidden="true">↗</span></a>
        <a href="index.html#top">НАГОРУ <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </div>
</footer>

<script src="js/products-data.js?v=60"></script>
<script src="js/main.js?v=60"></script>
</body>
</html>
"""


def build_products_data_js():
    out_path = os.path.join(ROOT, "js", "products-data.js")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("window.SENATOR_PRODUCTS = ")
        json.dump(PRODUCTS, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print("wrote", out_path)


def clean_stale_product_pages():
    """Remove product-*.html files for products no longer in products.json."""
    current_ids = {p["id"] for p in PRODUCTS}
    for path in glob.glob(os.path.join(ROOT, "product-*.html")):
        filename = os.path.basename(path)
        product_id = filename[len("product-"):-len(".html")]
        if product_id not in current_ids:
            os.remove(path)
            print("removed stale", path)


def build_media(p):
    """Same frame on every product page; photos inside it when the product has them."""
    images = p.get("images") or []
    name = p["name"]

    lines = ['        <div class="product-gallery" data-gallery>',
             '          <div class="product-gallery-stage">']

    if images:
        for i, src in enumerate(images):
            cls = ' class="is-active"' if i == 0 else ""
            lazy = "" if i == 0 else ' loading="lazy"'
            lines.append(f'            <img src="{src}" alt="{name}"{cls}{lazy}>')

        if len(images) > 1:
            lines.append('            <button type="button" class="gallery-nav gallery-prev" aria-label="Попереднє фото">‹</button>')
            lines.append('            <button type="button" class="gallery-nav gallery-next" aria-label="Наступне фото">›</button>')
    else:
        lines.append(f'            <div class="product-placeholder {p["tone"]}">')
        lines.append(f"              {PRODUCT_PLACEHOLDER_SVG}")
        lines.append("              <span>ФОТО ТОВАРУ</span>")
        lines.append("            </div>")

    lines.append("          </div>")

    # the dots row is always present so the media column is the same height on every page
    lines.append('          <div class="product-gallery-dots">')
    if len(images) > 1:
        for i in range(len(images)):
            cls = ' class="is-active"' if i == 0 else ""
            lines.append(f'            <button type="button"{cls} aria-label="Фото {i + 1}"></button>')
    lines.append("          </div>")

    lines.append("        </div>")
    return "\n".join(lines)


def money(value):
    return f"{value:,}".replace(",", " ")


def build_price(p):
    """One price, or a range when the price depends on the size."""
    tiers = p.get("priceTiers") or []
    if tiers:
        prices = [t["price"] for t in tiers]
        return f"{money(min(prices))} – {money(max(prices))} грн"
    return f'{money(p["price"])} грн'


def build_sizes(p):
    sizes = p.get("sizes") or []
    if not sizes:
        return ""
    return ('\n          <p class="product-detail-sizes">'
            f'<span>Розміри</span> {" · ".join(sizes)}</p>')


def build_brand(p):
    brand = p.get("brand")
    if not brand:
        return ""
    return ('\n          <p class="product-detail-sizes">'
            f'<span>Бренд</span> {brand}</p>')


def build_price_tiers(p):
    tiers = p.get("priceTiers") or []
    if not tiers:
        return ""
    parts = " · ".join(f'{t["sizes"]} — {money(t["price"])} грн' for t in tiers)
    return ('\n          <p class="product-detail-sizes">'
            f'<span>Ціна</span> {parts}</p>')


def build_product_pages():
    for p in PRODUCTS:
        body = f'''  <section class="product-page">
    <div class="shell">
      <a class="back-link" href="catalog.html"><span aria-hidden="true">←</span> <span>До каталогу</span></a>

      <div class="product-layout">
{build_media(p)}

        <div class="product-detail-info">
          <p class="eyebrow product-detail-category">{p["group"]} · {p["category"]}</p>
          <h1>{p["name"]}</h1>
          <p class="product-detail-price">{build_price(p)}</p>

          <p class="product-detail-desc">{p["description"]}</p>
{build_sizes(p)}{build_price_tiers(p)}{build_brand(p)}
          <p class="product-availability-note">Наявність розміру та кількості уточнює менеджер під час дзвінка.</p>

          <div class="product-cta-row">
            <a class="btn btn-solid" href="consultation.html?product={p["id"]}">ОНЛАЙН-КОНСУЛЬТАЦІЯ</a>
          </div>
        </div>
      </div>
    </div>
  </section>
'''

        html = HEAD.format(
            title=f'{p["name"]} - СЕНАТОР',
            description=f'{p["name"]}, {p["category"].lower()} від СЕНАТОР. {p["price"]:,} грн.',
        ) + body + FOOTER

        out_path = os.path.join(ROOT, f'product-{p["id"]}.html')
        with open(out_path, "w", encoding="utf-8") as f:
            # short prepositions must not be left hanging at a line end
            f.write(fix_html(html))
        print("wrote", out_path)


if __name__ == "__main__":
    build_products_data_js()
    clean_stale_product_pages()
    build_product_pages()
    print("done:", len(PRODUCTS), "products")
