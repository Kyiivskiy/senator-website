(function () {
  "use strict";

  var STORAGE_KEY = "senator-cart";
  var CURRENCY_UAH = "грн";

  // Filled in after the backend is deployed (see backend/README.md).
  // Left empty, the notification call is skipped and checkout behaves
  // exactly as before -- nothing breaks while this is unset.
  var ORDER_NOTIFY_URL = "";
  var ORDER_API_KEY = "";

  function readCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
    renderBadges();
  }

  function findProduct(id) {
    var list = window.SENATOR_PRODUCTS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function currentLang() {
    return document.documentElement.lang === "en" ? "en" : "uk";
  }

  var Cart = {
    getItems: function () {
      return readCart();
    },
    add: function (id, size, qty) {
      var items = readCart();
      var existing = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id && items[i].size === size) {
          existing = items[i];
          break;
        }
      }
      if (existing) {
        existing.qty += qty;
      } else {
        items.push({ id: id, size: size, qty: qty });
      }
      writeCart(items);
    },
    updateQty: function (id, size, qty) {
      var items = readCart();
      items = items.map(function (item) {
        if (item.id === id && item.size === size) {
          return { id: id, size: size, qty: Math.max(1, qty) };
        }
        return item;
      });
      writeCart(items);
    },
    remove: function (id, size) {
      var items = readCart().filter(function (item) {
        return !(item.id === id && item.size === size);
      });
      writeCart(items);
    },
    clear: function () {
      writeCart([]);
    },
    count: function () {
      return readCart().reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);
    },
    totalUAH: function () {
      return readCart().reduce(function (sum, item) {
        var product = findProduct(item.id);
        var price = product ? product.price : 0;
        return sum + price * item.qty;
      }, 0);
    }
  };

  function formatPrice(amount) {
    return amount.toLocaleString("uk-UA") + " " + CURRENCY_UAH;
  }

  function renderBadges() {
    var count = Cart.count();
    document.querySelectorAll(".cart-badge").forEach(function (badge) {
      badge.textContent = count > 0 ? String(count) : "";
      badge.setAttribute("data-count", String(count));
    });
  }

  function renderCartPage() {
    var listEl = document.getElementById("cart-list");
    var emptyEl = document.getElementById("cart-empty");
    var summaryEl = document.getElementById("cart-summary");
    if (!listEl) return;

    var items = readCart();
    var lang = currentLang();

    if (!items.length) {
      listEl.hidden = true;
      if (summaryEl) summaryEl.hidden = true;
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    listEl.hidden = false;
    if (summaryEl) summaryEl.hidden = false;
    if (emptyEl) emptyEl.hidden = true;

    listEl.innerHTML = "";
    var subtotal = 0;

    items.forEach(function (item) {
      var product = findProduct(item.id);
      if (!product) return;
      var lineTotal = product.price * item.qty;
      subtotal += lineTotal;

      var row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<div class="cart-item-media"><div class="product-placeholder ' + product.tone + '">' +
        placeholderSvg() +
        "</div></div>" +
        '<div class="cart-item-info">' +
        '<span class="cart-item-name">' + product.name[lang] + "</span>" +
        '<span class="cart-item-meta">' + (lang === "en" ? "Size" : "Розмір") + " " + item.size + "</span>" +
        '<span class="cart-item-price">' + formatPrice(lineTotal) + "</span>" +
        "</div>" +
        '<div class="cart-item-actions">' +
        '<div class="qty-stepper" data-id="' + product.id + '" data-size="' + item.size + '">' +
        '<button type="button" class="qty-minus" aria-label="' + (lang === "en" ? "Decrease quantity" : "Зменшити кількість") + '">−</button>' +
        '<input type="text" class="qty-input" value="' + item.qty + '" inputmode="numeric" aria-label="' + (lang === "en" ? "Quantity" : "Кількість") + '" readonly>' +
        '<button type="button" class="qty-plus" aria-label="' + (lang === "en" ? "Increase quantity" : "Збільшити кількість") + '">+</button>' +
        "</div>" +
        '<button type="button" class="cart-item-remove" data-id="' + product.id + '" data-size="' + item.size + '">' +
        (lang === "en" ? "Remove" : "Видалити") +
        "</button>" +
        "</div>";
      listEl.appendChild(row);
    });

    var subtotalEl = document.getElementById("cart-subtotal");
    var totalEl = document.getElementById("cart-total");
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (totalEl) totalEl.textContent = formatPrice(subtotal);

    listEl.querySelectorAll(".qty-minus, .qty-plus").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var wrap = btn.closest(".qty-stepper");
        var id = wrap.getAttribute("data-id");
        var size = wrap.getAttribute("data-size");
        var input = wrap.querySelector(".qty-input");
        var qty = parseInt(input.value, 10) || 1;
        qty = btn.classList.contains("qty-plus") ? qty + 1 : qty - 1;
        if (qty < 1) {
          Cart.remove(id, size);
        } else {
          Cart.updateQty(id, size, qty);
        }
        renderCartPage();
      });
    });

    listEl.querySelectorAll(".cart-item-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Cart.remove(btn.getAttribute("data-id"), btn.getAttribute("data-size"));
        renderCartPage();
      });
    });
  }

  function renderCheckoutSummary() {
    var listEl = document.getElementById("checkout-lines");
    if (!listEl) return;

    var items = readCart();
    var lang = currentLang();

    if (!items.length) {
      window.location.href = "cart.html";
      return;
    }

    listEl.innerHTML = "";
    var subtotal = 0;

    items.forEach(function (item) {
      var product = findProduct(item.id);
      if (!product) return;
      var lineTotal = product.price * item.qty;
      subtotal += lineTotal;

      var row = document.createElement("div");
      row.className = "checkout-line";
      row.innerHTML =
        '<span class="name">' + product.name[lang] + " · " + item.size + " × " + item.qty + "</span>" +
        '<span class="price">' + formatPrice(lineTotal) + "</span>";
      listEl.appendChild(row);
    });

    var totalEl = document.getElementById("checkout-total-value");
    if (totalEl) totalEl.textContent = formatPrice(subtotal);
  }

  function placeholderSvg() {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">' +
      '<path d="M18 10h12l3 6h5l-2 26H12L10 16h5l3-6z"/>' +
      '<path d="M18 10a6 6 0 0 0 12 0"/>' +
      "</svg>";
  }

  function initProductPage() {
    var addBtn = document.getElementById("add-to-cart");
    if (!addBtn) return;

    var sizeButtons = document.querySelectorAll(".size-btn");
    var selectedSize = sizeButtons.length ? sizeButtons[0].getAttribute("data-size") : null;
    if (sizeButtons.length) {
      sizeButtons[0].setAttribute("aria-pressed", "true");
    }

    sizeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        sizeButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        selectedSize = btn.getAttribute("data-size");
      });
    });

    var qtyInput = document.getElementById("product-qty");
    var qtyMinus = document.getElementById("qty-minus");
    var qtyPlus = document.getElementById("qty-plus");

    if (qtyMinus && qtyInput) {
      qtyMinus.addEventListener("click", function () {
        var qty = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        qtyInput.value = String(qty);
      });
    }
    if (qtyPlus && qtyInput) {
      qtyPlus.addEventListener("click", function () {
        var qty = (parseInt(qtyInput.value, 10) || 1) + 1;
        qtyInput.value = String(qty);
      });
    }

    addBtn.addEventListener("click", function () {
      var id = addBtn.getAttribute("data-product-id");
      var qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
      Cart.add(id, selectedSize, qty);

      var original = addBtn.innerHTML;
      var lang = currentLang();
      addBtn.textContent = lang === "en" ? "Added" : "Додано";
      setTimeout(function () {
        addBtn.innerHTML = original;
      }, 1400);
    });
  }

  function initCheckoutForm() {
    var form = document.getElementById("checkout-form");
    if (!form) return;

    var cityInput = document.getElementById("field-city");
    if (cityInput && window.SenatorAutosuggest && window.SENATOR_NP_CITIES) {
      window.SenatorAutosuggest.attach(cityInput, function () {
        return window.SENATOR_NP_CITIES;
      });
    }

    var recipientSelf = document.getElementById("field-recipient-self");
    var recipientFields = document.getElementById("recipient-fields");
    var recipientName = document.getElementById("field-recipient-name");
    var recipientPhone = document.getElementById("field-recipient-phone");

    function syncRecipientFields() {
      if (!recipientSelf || !recipientFields) return;
      var isSelf = recipientSelf.checked;
      recipientFields.hidden = isSelf;
      [recipientName, recipientPhone].forEach(function (field) {
        if (!field) return;
        if (isSelf) {
          field.removeAttribute("required");
          field.closest(".form-group").classList.remove("has-error");
        } else {
          field.setAttribute("required", "required");
        }
      });
    }

    if (recipientSelf) {
      recipientSelf.addEventListener("change", syncRecipientFields);
      syncRecipientFields();
    }

    var consentBox = document.getElementById("field-consent");
    var consentError = document.getElementById("consent-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (field) {
        var group = field.closest(".form-group");
        var filled = field.type === "checkbox" ? field.checked : field.value.trim();
        if (!filled) {
          valid = false;
          if (group) group.classList.add("has-error");
        } else if (group) {
          group.classList.remove("has-error");
        }
      });

      if (consentBox) {
        if (!consentBox.checked) {
          valid = false;
          if (consentError) consentError.style.display = "block";
        } else if (consentError) {
          consentError.style.display = "none";
        }
      }

      if (!valid) return;

      var orderId = "SEN-" + Date.now().toString().slice(-8);
      var isSelf = !recipientSelf || recipientSelf.checked;
      var formData = new FormData(form);
      var lang = currentLang();

      var resolvedItems = readCart().map(function (item) {
        var product = findProduct(item.id);
        return {
          name: product ? product.name[lang] : item.id,
          size: item.size,
          qty: item.qty,
          lineTotal: product ? product.price * item.qty : 0
        };
      });

      var order = {
        id: orderId,
        items: resolvedItems,
        total: Cart.totalUAH(),
        contact: {
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email")
        },
        delivery: {
          city: formData.get("city"),
          branch: formData.get("branch")
        },
        recipient: isSelf
          ? null
          : { name: formData.get("recipientName"), phone: formData.get("recipientPhone") },
        notes: formData.get("notes") || ""
      };

      try {
        sessionStorage.setItem("senator-last-order", JSON.stringify(order));
      } catch (err) {}

      if (ORDER_NOTIFY_URL) {
        try {
          fetch(ORDER_NOTIFY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-API-Key": ORDER_API_KEY },
            body: JSON.stringify(order),
            keepalive: true
          }).catch(function () {});
        } catch (err) {}
      }

      Cart.clear();
      window.location.href = "order-success.html";
    });
  }

  function renderOrderConfirmation() {
    var el = document.getElementById("confirm-order-id");
    if (!el) return;
    try {
      var raw = sessionStorage.getItem("senator-last-order");
      var order = raw ? JSON.parse(raw) : null;
      el.textContent = order ? order.id : "";
    } catch (e) {}
  }

  window.SenatorCart = Cart;

  document.addEventListener("DOMContentLoaded", function () {
    renderBadges();
    renderCartPage();
    renderCheckoutSummary();
    initProductPage();
    initCheckoutForm();
    renderOrderConfirmation();
  });

  document.addEventListener("senator:langchange", function () {
    renderCartPage();
    renderCheckoutSummary();
  });
})();
