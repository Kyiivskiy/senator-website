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


  function initConsultationForm() {
    var form = document.getElementById("consultation-form");
    if (!form) return;

    /* Arriving from a product page (consultation.html?product=<id>): show the
       customer which item the request is tied to and pass it to the manager. */
    var product = findProduct(getQueryParam("product"));
    if (product) {
      var row = document.getElementById("consultation-product");
      var nameEl = document.getElementById("consultation-product-name");
      if (row && nameEl) {
        nameEl.textContent = product.name[currentLang()];
        row.hidden = false;
        document.addEventListener("senator:langchange", function () {
          nameEl.textContent = product.name[currentLang()];
        });
      }
    }

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
        preferredTime: formData.get("callTime"),
        product: product ? product.name[currentLang()] : "",
        website: formData.get("website") // honeypot: filled only by bots
      });

      window.location.href = "success.html";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initConsultationForm();
  });
})();
