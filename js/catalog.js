(function () {
  "use strict";

  var grid = document.getElementById("catalog-grid");
  if (!grid) return;

  var filtersEl = document.getElementById("catalog-filters");
  var sortSelect = document.getElementById("catalog-sort-select");
  var countEl = document.getElementById("catalog-count");
  var noResultsEl = document.getElementById("catalog-no-results");

  var selectedCategory = null;

  function placeholderSvg() {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">' +
      '<path d="M18 10h12l3 6h5l-2 26H12L10 16h5l3-6z"/>' +
      '<path d="M18 10a6 6 0 0 0 12 0"/>' +
      "</svg>";
  }

  function pluralUk(n, one, few, many) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function countLabel(n) {
    return n + " " + pluralUk(n, "товар", "товари", "товарів");
  }

  /* Fixed catalog structure: the sidebar stays the same whether or not a
     category currently has items, so it does not shuffle as stock changes. */
  var CATALOG_STRUCTURE = [
    { group: "Одяг", categories: ["Костюми", "Брюки", "Сорочки"] }
  ];

  function renderFilters() {
    if (!filtersEl) return;

    var html = '<button type="button" class="filter-btn filter-btn--all' +
      (selectedCategory === null ? " is-active" : "") +
      '" data-category="">Всі товари</button>';

    CATALOG_STRUCTURE.forEach(function (g) {
      html += '<div class="filter-group"><p class="filter-group-title">' + g.group + "</p>";
      g.categories.forEach(function (c) {
        var active = selectedCategory === c ? " is-active" : "";
        html += '<button type="button" class="filter-btn' + active + '" data-category="' +
          c.replace(/"/g, "&quot;") + '">' + c + "</button>";
      });
      html += "</div>";
    });

    filtersEl.innerHTML = html;

    filtersEl.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-category");
        selectedCategory = cat === "" ? null : cat;
        renderFilters();
        renderGrid();
      });
    });
  }

  function sortProducts(list) {
    var mode = sortSelect ? sortSelect.value : "name-asc";
    var sorted = list.slice();

    if (mode === "price-asc") {
      sorted.sort(function (a, b) { return a.price - b.price; });
    } else if (mode === "price-desc") {
      sorted.sort(function (a, b) { return b.price - a.price; });
    } else {
      sorted.sort(function (a, b) { return a.name.localeCompare(b.name, "uk"); });
    }

    return sorted;
  }

  function priceLabel(p) {
    var amount = p.price;
    var prefix = "";

    // tiered pricing: the card shows the entry price, the detail page the range
    if (p.priceTiers && p.priceTiers.length) {
      amount = Math.min.apply(null, p.priceTiers.map(function (t) { return t.price; }));
      prefix = "від ";
    }

    return prefix + amount.toLocaleString("uk-UA") + " грн";
  }

  function renderGrid() {
    var products = window.SENATOR_PRODUCTS || [];

    var filtered = selectedCategory
      ? products.filter(function (p) { return p.category === selectedCategory; })
      : products;

    filtered = sortProducts(filtered);

    if (countEl) countEl.textContent = countLabel(filtered.length);

    if (!filtered.length) {
      grid.innerHTML = "";
      if (noResultsEl) noResultsEl.hidden = false;
      return;
    }
    if (noResultsEl) noResultsEl.hidden = true;

    grid.innerHTML = filtered.map(function (p) {
      var media = p.images && p.images.length
        ? '<img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy">'
        : '<div class="product-placeholder ' + p.tone + '">' + placeholderSvg() +
          "<span>ФОТО ТОВАРУ</span></div>";

      return '<a class="product-card" href="product-' + p.id + '.html">' +
        '<div class="product-media">' + media + "</div>" +
        '<div class="product-info">' +
        '<span class="product-category">' + p.category + "</span>" +
        '<span class="product-name">' + p.name + "</span>" +
        '<span class="product-price">' + priceLabel(p) + "</span>" +
        "</div></a>";
    }).join("");
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", renderGrid);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderFilters();
    renderGrid();
  });
})();
