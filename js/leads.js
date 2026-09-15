(function () {
  "use strict";

  var LEAD_NOTIFY_URL = "https://senator-backend.onrender.com/api/notify-lead";
  var LEAD_API_KEY = "u-M49VC0-u_azu8a095TezYA_gscB5TLkKlJB5Fddvo";

  var SENDING_LABEL = "ВІДПРАВЛЯЄМО…";

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

  /* Resolves only once the backend confirms it took the lead. The free Render
     instance can be cold, so allow a generous timeout before giving up —
     better a waiting customer than a request that silently disappears. */
  function sendLead(lead) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 60000);

    return fetch(LEAD_NOTIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": LEAD_API_KEY },
      body: JSON.stringify(lead),
      signal: controller.signal
    }).then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    }).then(function (body) {
      if (!body || body.ok !== true) throw new Error("backend refused the lead");
    }).finally(function () {
      clearTimeout(timer);
    });
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
        nameEl.textContent = product.name;
        row.hidden = false;
      }
    }

    var consentBox = document.getElementById("field-consent");
    var consentError = document.getElementById("consent-error");

    var submitBtn = form.querySelector("button[type=submit]");
    var sendError = document.getElementById("send-error");
    var submitLabel = submitBtn ? submitBtn.innerHTML : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form, consentBox, consentError)) return;

      var formData = new FormData(form);

      if (sendError) sendError.hidden = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = SENDING_LABEL;
      }

      sendLead({
        type: "consultation",
        name: formData.get("name"),
        phone: formData.get("phone"),
        preferredTime: formData.get("callTime"),
        product: product ? product.name : "",
        website: formData.get("website") // honeypot: filled only by bots
      }).then(function () {
        window.location.href = "success.html";
      }).catch(function () {
        // never pretend it went through — offer the phone instead
        if (sendError) {
          sendError.hidden = false;
          sendError.scrollIntoView({ block: "nearest" });
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitLabel;
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initConsultationForm();
  });
})();
