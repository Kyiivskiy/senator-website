(function () {
  "use strict";

  var grid = document.getElementById("catalog-grid");
  if (!grid) return;

  var filtersEl = document.getElementById("catalog-filters");
  var sortSelect = document.getElementById("catalog-sort-select");
  var countEl = document.getElementById("catalog-count");
  var noResultsEl = document.getElementById("catalog-no-results");

  var selectedCategory = null;

  function currentLang() {
    return document.documentElement.lang === "en" ? "en" : "uk";
  }

  function placeholderSvg() {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">' +
      '<path d="M18 10h12l3 6h5l-2 26H12L10 16h5l3-6z"/>' +
      '<path d="M18 10a6 6 0 0 0 12 0"/>' +
      "</svg>";
  }

  function photoLabel(lang) {
    return lang === "en" ? "PRODUCT PHOTO" : "ФОТО ТОВАРУ";
  }

  function pluralUk(n, one, few, many) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function countLabel(n, lang) {
    if (lang === "en") return n + (n === 1 ? " product" : " products");
    return n + " " + pluralUk(n, "товар", "товари", "товарів");
  }

  function getGroups() {
    var products = window.SENATOR_PRODUCTS || [];
    var groups = [];
    var groupIndex = {};

    products.forEach(function (p) {
      var groupKey = p.group.uk;
      if (!(groupKey in groupIndex)) {
        groupIndex[groupKey] = groups.length;
        groups.push({ group: p.group, categories: [], categoryKeys: {} });
      }
      var groupEntry = groups[groupIndex[groupKey]];
      var catKey = p.category.uk;
      if (!(catKey in groupEntry.categoryKeys)) {
        groupEntry.categoryKeys[catKey] = true;
        groupEntry.categories.push(p.category);
      }
    });

    return groups;
  }

  function renderFilters() {
    if (!filtersEl) return;
    var lang = currentLang();
    var groups = getGroups();

    var allLabel = lang === "en" ? "All products" : "Всі товари";
    var html = '<button type="button" class="filter-btn filter-btn--all' +
      (selectedCategory === null ? " is-active" : "") +
      '" data-category="" data-i18n="shop.filterAll">' + allLabel + "</button>";

    groups.forEach(function (g) {
      html += '<div class="filter-group"><p class="filter-group-title">' + g.group[lang] + "</p>";
      g.categories.forEach(function (c) {
        var active = selectedCategory === c.uk ? " is-active" : "";
        html += '<button type="button" class="filter-btn' + active + '" data-category="' +
          c.uk.replace(/"/g, "&quot;") + '">' + c[lang] + "</button>";
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
    var lang = currentLang();
    var mode = sortSelect ? sortSelect.value : "name-asc";
    var sorted = list.slice();

    if (mode === "price-asc") {
      sorted.sort(function (a, b) { return a.price - b.price; });
    } else if (mode === "price-desc") {
      sorted.sort(function (a, b) { return b.price - a.price; });
    } else {
      sorted.sort(function (a, b) { return a.name[lang].localeCompare(b.name[lang], lang); });
    }

    return sorted;
  }

  function renderGrid() {
    var lang = currentLang();
    var products = window.SENATOR_PRODUCTS || [];

    var filtered = selectedCategory
      ? products.filter(function (p) { return p.category.uk === selectedCategory; })
      : products;

    filtered = sortProducts(filtered);

    if (countEl) countEl.textContent = countLabel(filtered.length, lang);

    if (!filtered.length) {
      grid.innerHTML = "";
      if (noResultsEl) noResultsEl.hidden = false;
      return;
    }
    if (noResultsEl) noResultsEl.hidden = true;

    grid.innerHTML = filtered.map(function (p) {
      return '<a class="product-card" href="product-' + p.id + '.html">' +
        '<div class="product-media"><div class="product-placeholder ' + p.tone + '">' +
        placeholderSvg() +
        "<span>" + photoLabel(lang) + "</span></div></div>" +
        '<div class="product-info">' +
        '<span class="product-category">' + p.category[lang] + "</span>" +
        '<span class="product-name">' + p.name[lang] + "</span>" +
        '<span class="product-price">' + p.price.toLocaleString("uk-UA") + " грн</span>" +
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

  document.addEventListener("senator:langchange", function () {
    renderFilters();
    renderGrid();
  });
})();
