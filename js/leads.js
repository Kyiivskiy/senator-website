(function () {
  "use strict";

  var LEAD_NOTIFY_URL = "https://senator-backend.onrender.com/api/notify-lead";
  var LEAD_API_KEY = "u-M49VC0-u_azu8a095TezYA_gscB5TLkKlJB5Fddvo";

  function currentLang() {
    return document.documentElement.lang === "en" ? "en" : "uk";
  }

  function findProduct(id) {
    var list = window.SENATOR_PRODUCTS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function validateForm(form, consentBox, consentError) {
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

    return valid;
  }

  function sendLead(lead) {
    if (!LEAD_NOTIFY_URL) return;
    try {
      fetch(LEAD_NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": LEAD_API_KEY },
        body: JSON.stringify(lead),
        keepalive: true
      }).catch(function () {});
    } catch (err) {}
  }

  function initFittingForm() {
    var form = document.getElementById("fitting-form");
    if (!form) return;

    var productSelect = document.getElementById("field-product");
    if (productSelect) {
      var lang = currentLang();
      var products = window.SENATOR_PRODUCTS || [];
      products.forEach(function (p) {
        var opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = p.name[lang];
        productSelect.appendChild(opt);
      });
      var preselect = getQueryParam("product");
      if (preselect && findProduct(preselect)) {
        productSelect.value = preselect;
      }
    }

    var consentBox = document.getElementById("field-consent");
    var consentError = document.getElementById("consent-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form, consentBox, consentError)) return;

      var formData = new FormData(form);
      var productId = formData.get("product");
      var product = productId ? findProduct(productId) : null;

      sendLead({
        type: "fitting",
        name: formData.get("name"),
        phone: formData.get("phone"),
        preferredTime: formData.get("preferredTime"),
        product: product ? product.name[currentLang()] : ""
      });

      window.location.href = "success.html";
    });
  }

  function initConsultationForm() {
    var form = document.getElementById("consultation-form");
    if (!form) return;

    var consentBox = document.getElementById("field-consent");
    var consentError = document.getElementById("consent-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form, consentBox, consentError)) return;

      var formData = new FormData(form);

      sendLead({
        type: "consultation",
        name: formData.get("name"),
        phone: formData.get("phone"),
        preferredTime: formData.get("callTime")
      });

      window.location.href = "success.html";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFittingForm();
    initConsultationForm();
  });
})();
