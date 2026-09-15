import glob
import json
import os

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
<title data-i18n-title="meta.title">{title}</title>
<meta name="description" content="{description}" data-i18n-meta="meta.description">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css?v=41">
</head>
<body>

<a class="skip-link" href="#main">Перейти до основного змісту</a>

<div class="header-group" id="header-group">
<div class="top-bar">
  <div class="shell top-bar-inner">
    <div class="top-bar-contacts">
      <a class="top-bar-item" href="tel:+380631840915"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +38 (063) 184-09-15</a>
      <a class="top-bar-item" href="tel:+380933835654"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +38 (093) 383-56-54</a>
      <a class="top-bar-item top-bar-address" href="https://www.google.com/maps/search/?api=1&#38;query=%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B0+%D0%9C%D0%BE%D1%80%D1%81%D1%8C%D0%BA%D0%B0+69%D0%B0+%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2" target="_blank" rel="noopener noreferrer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> м. Миколаїв, вул. Велика Морська 69А, 54001</a>
    </div>
    <div class="top-bar-social">
      <a href="https://www.instagram.com/senator_hermose_mikolaiv_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
    </div>
  </div>
</div>

<header class="site-header" id="site-header">
  <div class="shell header-inner">
    <a class="wordmark-link" href="index.html">
      <span class="wordmark" data-i18n="brand.name">СЕНАТОР</span>
      <span class="wordmark-sub">MAISON OF MENSWEAR</span>
    </a>

    <nav class="main-nav" aria-label="Основна навігація">
      <a href="catalog.html" data-i18n="nav.catalog">Каталог</a>
      <a href="index.html#salon" data-i18n="nav.salon">Про салон</a>
      <a href="index.html#visit" data-i18n="nav.contacts">Контакти</a>
    </nav>

    <div class="header-actions">
      <button type="button" class="lang-toggle" id="lang-toggle" aria-label="Змінити мову сайту">
        <span id="lang-toggle-label">EN</span>
      </button>
      <a class="btn btn-solid header-cta" href="consultation.html" data-i18n-html="header.cta">ЗАПИСАТИСЯ НА ПРИМІРКУ <span aria-hidden="true">↗</span></a>
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
    <a href="catalog.html" data-i18n="nav.catalog">Каталог</a>
    <a href="index.html#salon" data-i18n="nav.salon">Про салон</a>
    <a href="index.html#visit" data-i18n="nav.contacts">Контакти</a>
    <a class="mobile-nav-cta" href="consultation.html" data-i18n-html="header.cta">ЗАПИСАТИСЯ НА ПРИМІРКУ <span aria-hidden="true">↗</span></a>
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
    <p class="footer-wordmark" data-i18n="brand.name">СЕНАТОР</p>
    <div class="footer-row">
      <p class="footer-tagline" data-i18n="footer.tagline">Статус не проголошують. Його носять.</p>
      <div class="footer-meta">
        <span data-i18n="footer.copyright">© 2026 СЕНАТОР</span>
        <a href="tel:+380631840915">+380 63 184 09 15</a>
        <a href="tel:+380933835654">+380 93 383 56 54</a>
        <a href="privacy.html" data-i18n="footer.privacy">Конфіденційність</a>
        <a href="https://www.instagram.com/senator_hermose_mikolaiv_/" target="_blank" rel="noopener noreferrer">INSTAGRAM <span aria-hidden="true">↗</span></a>
        <a href="index.html#top" data-i18n-html="footer.toTop">НАГОРУ <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </div>
</footer>

<script src="js/products-data.js?v=36"></script>
<script src="js/main.js?v=41"></script>
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
    name = p["name"]["uk"]

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
    return ('\n          <p class="product-detail-sizes product-detail-brand">'
            f'<span>Бренд</span> {brand}</p>')


def build_price_tiers(p):
    tiers = p.get("priceTiers") or []
    if not tiers:
        return ""
    parts = " · ".join(f'{t["sizes"]} — {money(t["price"])} грн' for t in tiers)
    return ('\n          <p class="product-detail-sizes product-detail-tiers">'
            f'<span>Ціна</span> {parts}</p>')


def build_product_pages():
    for p in PRODUCTS:
        body = f'''  <section class="product-page">
    <div class="shell">
      <a class="back-link" href="catalog.html"><span aria-hidden="true">←</span> <span data-i18n="shop.backToCatalog">До каталогу</span></a>

      <div class="product-layout">
{build_media(p)}

        <div class="product-detail-info">
          <p class="eyebrow product-detail-category">{p["group"]["uk"]} · {p["category"]["uk"]}</p>
          <h1>{p["name"]["uk"]}</h1>
          <p class="product-detail-price">{build_price(p)}</p>

          <p class="product-detail-desc">{p["description"]["uk"]}</p>
{build_sizes(p)}{build_price_tiers(p)}{build_brand(p)}
          <p class="product-availability-note" data-i18n="shop.productNote">Наявність розміру та кількості уточнює менеджер під час дзвінка.</p>

          <div class="product-cta-row">
            <a class="btn btn-solid" href="consultation.html?product={p["id"]}" data-i18n-html="shop.productCtaConsultation">ЗАМОВИТИ ОНЛАЙН-КОНСУЛЬТАЦІЮ <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </div>
  </section>
'''

        html = HEAD.format(
            title=f'{p["name"]["uk"]} - СЕНАТОР',
            description=f'{p["name"]["uk"]}, {p["category"]["uk"].lower()} від СЕНАТОР. {p["price"]:,} грн.',
        ) + body + FOOTER

        out_path = os.path.join(ROOT, f'product-{p["id"]}.html')
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", out_path)


if __name__ == "__main__":
    build_products_data_js()
    clean_stale_product_pages()
    build_product_pages()
    print("done:", len(PRODUCTS), "products")
