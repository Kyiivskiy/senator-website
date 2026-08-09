(function () {
  "use strict";

  var STORAGE_KEY = "senator-lang";

  var dict = {
    uk: {
      meta: {
        title: "СЕНАТОР - чоловіча класика у Миколаєві",
        description: "Салон чоловічої класики у Миколаєві. Офіційний представник HERMOSE в Україні. Костюми, піджаки, сорочки та персональний підбір образу."
      },
      brand: { name: "СЕНАТОР" },
      nav: {
        salon: "Про салон",
        hermose: "HERMOSE",
        looks: "Образи",
        story: "Історія",
        visit: "Візит",
        catalog: "Каталог"
      },
      header: { cta: "Візит <span aria-hidden=\"true\">↗</span>" },
      shop: {
        catalogEyebrow: "КАТАЛОГ СЕНАТОРА",
        catalogTitle: "Всі образи в одному місці.",
        catalogLead: "Костюми, піджаки, сорочки та аксесуари HERMOSE. Фото та описи ще уточнюються.",
        filterAll: "Всі товари",
        sortLabel: "Сортувати",
        sortNameAsc: "За назвою (А-Я)",
        sortPriceAsc: "Спочатку дешевші",
        sortPriceDesc: "Спочатку дорожчі",
        noResults: "У цій категорії поки немає товарів.",
        backToCatalog: "До каталогу",
        addToCart: "ДОДАТИ В КОШИК <span aria-hidden=\"true\">↗</span>",
        sizeLabel: "Розмір",
        qtyLabel: "Кількість",
        cartEyebrow: "ВАШЕ ЗАМОВЛЕННЯ",
        cartTitle: "Кошик",
        cartEmptyText: "Ваш кошик порожній.",
        cartEmptyCta: "ПЕРЕГЛЯНУТИ КАТАЛОГ <span aria-hidden=\"true\">↗</span>",
        cartSubtotalLabel: "Проміжний підсумок",
        cartDeliveryNote: "Вартість доставки Новою Поштою розраховується на наступному кроці.",
        cartTotalLabel: "Разом",
        cartCheckoutCta: "ОФОРМИТИ ЗАМОВЛЕННЯ <span aria-hidden=\"true\">↗</span>",
        checkoutEyebrow: "ОСТАННІЙ КРОК",
        checkoutTitle: "Оформлення замовлення",
        checkoutContactLegend: "Контактні дані",
        checkoutDeliveryLegend: "Доставка Новою Поштою",
        formName: "Ім'я та прізвище",
        formPhone: "Телефон",
        formEmail: "Email",
        formCity: "Місто",
        formBranch: "Номер відділення",
        formErrorRequired: "Заповніть це поле",
        checkoutSummaryTitle: "Ваше замовлення",
        checkoutTotalLabel: "До сплати",
        checkoutPayCta: "ОПЛАТИТИ КАРТКОЮ <span aria-hidden=\"true\">↗</span>",
        checkoutPaymentNote: "Захищена оплата карткою через LiqPay",
        checkoutDevNote: "Технічна примітка: оплата ще не підключена до реального LiqPay-акаунта. Кнопка симулює успішне замовлення для перегляду сценарію — реальна інтеграція буде додана після узгодження з магазином.",
        confirmEyebrow: "ЗАМОВЛЕННЯ ПРИЙНЯТО",
        confirmTitle: "Дякуємо за замовлення.",
        confirmBody: "Це демонстраційне підтвердження — оплата ще не підключена до реального банку. Коли інтеграція буде готова, тут з'явиться справжнє замовлення, і ми зв'яжемося з вами для підтвердження деталей.",
        confirmOrderLabel: "Номер замовлення",
        confirmBackHome: "НА ГОЛОВНУ",
        confirmContinue: "ПРОДОВЖИТИ ПОКУПКИ <span aria-hidden=\"true\">↗</span>"
      },
      hero: {
        eyebrow: "САЛОН ЧОЛОВІЧОЇ КЛАСИКИ · МИКОЛАЇВ",
        titleLine1: "Характер",
        titleLine2: "має форму.",
        lead: "Костюм не створює статус. Він точно показує, ким ви є.",
        ctaPrimary: "ЗАПИСАТИСЯ НА ПРИМІРКУ <span aria-hidden=\"true\">↗</span>",
        ctaSecondary: "ПЕРЕГЛЯНУТИ ОБРАЗИ <span aria-hidden=\"true\">↓</span>"
      },
      stats: {
        years: { unit: "років", label: "характеру та досвіду" },
        sizes: { label: "широкий розмірний ряд" },
        salon: { value: "01 салон", label: "у серці Миколаєва" }
      },
      salon: {
        eyebrow: "ЛАСКАВО ПРОСИМО ДО СЕНАТОРА",
        title: "Класика, що стає<br>особистою.",
        body: "Тут не продають перший костюм, який підійшов за розміром. Тут слухають, радять і допомагають знайти образ, що відповідає вашій події, характеру та намірам.",
        quote: "Статус не означає зачинені двері. У СЕНАТОРА кожного зустрічають як гостя.",
        link: "ЯК ПРОХОДИТЬ ЗУСТРІЧ <span aria-hidden=\"true\">↗</span>",
        imageAlt: "Чоловік поправляє манжет піджака в інтер'єрі салону"
      },
      manifesto: {
        title: "Ви ще не сказали<br>жодного слова.",
        accent: "Костюм уже почав розмову.",
        body: "Весілля. Випускний. Перша велика угода. Офіційна зустріч. Або звичайний день, у якому ви обираєте виглядати відповідно до власних стандартів."
      },
      hermose: {
        body: "Офіційний представник в Україні. Турецький бренд чоловічого одягу, що поєднує класичну школу, сучасний крій, комфорт і виразні матеріали. У салоні СЕНАТОР представлені костюми, піджаки, сорочки та аксесуари HERMOSE для ділових і вечірніх образів.",
        fact: "ВИРОБНИЦТВО · ТУРЕЧЧИНА",
        cta: "ДІЗНАТИСЯ ПРО БРЕНД <span aria-hidden=\"true\">↗</span>",
        imageAlt: "Два чоловіки в костюмах HERMOSE, світлому та темно-синьому"
      },
      looks: {
        eyebrow: "ОБРАЗИ СЕНАТОРА",
        title: "Не каталог. Напрямок.",
        lead: "Ми показуємо не окремі речі, а характери, які можна зібрати у салоні.",
        card1: { alt: "Чоловік у темно-графітовому діловому костюмі", name: "Влада", desc: "Глибокий графіт · діловий крій" },
        card2: { alt: "Чоловік у світлому костюмі кольору айворі", name: "Присутність", desc: "Світла класика · особлива подія" },
        card3: { alt: "Чоловік у темно-синьому костюмі", name: "Намір", desc: "Темно-синій · вечірній характер" }
      },
      process: {
        title: "Ваш костюм починається<br>з розмови.",
        step1: { title: "Розмова", body: "Розуміємо подію, ваш стиль і те, яке враження має створити образ." },
        step2: { title: "Вибір", body: "Пропонуємо декілька точних варіантів замість десятків випадкових." },
        step3: { title: "Примірка", body: "Оцінюємо посадку, пропорції та кожну деталь майбутнього образу." }
      },
      story: {
        title: "17 років характеру.",
        lead: "СЕНАТОР почався з кількох костюмів і маленької торгової точки на ринку. Ринок став першою адресою. Але ніколи не був межею.",
        body: "Наталія побудувала справу, яка продовжувала зростати незалежно від обставин. Поруч із нею - Людмила, подруга та незмінна менеджерка магазину, яка пройшла разом із СЕНАТОРОМ майже весь його шлях.",
        strongLine: "Кризи. Переїзди. COVID. Війна.",
        final: "Сьогодні це великий бутик у самому серці Миколаєва та офіційний представник HERMOSE в Україні.",
        link: "ЗАВІТАТИ ДО САЛОНУ <span aria-hidden=\"true\">↗</span>",
        imageAlt: "Крупний план рук, що поправляють білу манжету поверх темного піджака"
      },
      visit: {
        eyebrow: "ВІЗИТ",
        title: "Ваш костюм чекає на<br>особисте знайомство.",
        address: "вул. Велика Морська, 69а, Миколаїв",
        hours: "Щодня · 10:00-19:00",
        ctaPrimary: "ПРОКЛАСТИ МАРШРУТ <span aria-hidden=\"true\">↗</span>",
        ctaSecondary: "НАПИСАТИ В INSTAGRAM <span aria-hidden=\"true\">↗</span>"
      },
      footer: {
        tagline: "Статус не проголошують. Його носять.",
        copyright: "© 2026 СЕНАТОР",
        toTop: "НАГОРУ <span aria-hidden=\"true\">↑</span>"
      }
    },
    en: {
      meta: {
        title: "SENATOR - Classic Menswear in Mykolaiv",
        description: "A classic menswear salon in Mykolaiv. Official representative of HERMOSE in Ukraine. Suits, jackets, shirts, and personal styling."
      },
      brand: { name: "SENATOR" },
      nav: {
        salon: "About",
        hermose: "HERMOSE",
        looks: "Looks",
        story: "Story",
        visit: "Visit",
        catalog: "Catalog"
      },
      header: { cta: "Visit <span aria-hidden=\"true\">↗</span>" },
      shop: {
        catalogEyebrow: "SENATOR CATALOG",
        catalogTitle: "All the looks in one place.",
        catalogLead: "Suits, blazers, shirts, and HERMOSE accessories. Photos and descriptions are still being finalized.",
        filterAll: "All products",
        sortLabel: "Sort",
        sortNameAsc: "Name (A-Z)",
        sortPriceAsc: "Price: low to high",
        sortPriceDesc: "Price: high to low",
        noResults: "No products in this category yet.",
        backToCatalog: "Back to catalog",
        addToCart: "ADD TO CART <span aria-hidden=\"true\">↗</span>",
        sizeLabel: "Size",
        qtyLabel: "Quantity",
        cartEyebrow: "YOUR ORDER",
        cartTitle: "Cart",
        cartEmptyText: "Your cart is empty.",
        cartEmptyCta: "BROWSE CATALOG <span aria-hidden=\"true\">↗</span>",
        cartSubtotalLabel: "Subtotal",
        cartDeliveryNote: "Nova Poshta delivery cost is calculated at the next step.",
        cartTotalLabel: "Total",
        cartCheckoutCta: "PROCEED TO CHECKOUT <span aria-hidden=\"true\">↗</span>",
        checkoutEyebrow: "FINAL STEP",
        checkoutTitle: "Checkout",
        checkoutContactLegend: "Contact details",
        checkoutDeliveryLegend: "Nova Poshta delivery",
        formName: "Full name",
        formPhone: "Phone",
        formEmail: "Email",
        formCity: "City",
        formBranch: "Branch number",
        formErrorRequired: "Please fill in this field",
        checkoutSummaryTitle: "Your order",
        checkoutTotalLabel: "Total to pay",
        checkoutPayCta: "PAY BY CARD <span aria-hidden=\"true\">↗</span>",
        checkoutPaymentNote: "Secure card payment via LiqPay",
        checkoutDevNote: "Developer note: payment is not yet connected to a live LiqPay account. This button simulates a successful order so you can preview the flow. Real integration will be added once the shop's merchant account is approved.",
        confirmEyebrow: "ORDER RECEIVED",
        confirmTitle: "Thank you for your order.",
        confirmBody: "This is a demo confirmation. Payment is not yet connected to a real bank account. Once the integration is live, this will show a real order and we will contact you to confirm the details.",
        confirmOrderLabel: "Order number",
        confirmBackHome: "BACK TO HOME",
        confirmContinue: "CONTINUE SHOPPING <span aria-hidden=\"true\">↗</span>"
      },
      hero: {
        eyebrow: "CLASSIC MENSWEAR SALON · MYKOLAIV",
        titleLine1: "Character",
        titleLine2: "has a form.",
        lead: "A suit does not create status. It reveals who you are.",
        ctaPrimary: "BOOK A FITTING <span aria-hidden=\"true\">↗</span>",
        ctaSecondary: "EXPLORE THE LOOKS <span aria-hidden=\"true\">↓</span>"
      },
      stats: {
        years: { unit: "years", label: "of character and experience" },
        sizes: { label: "a wide size range" },
        salon: { value: "01 salon", label: "in the heart of Mykolaiv" }
      },
      salon: {
        eyebrow: "WELCOME TO SENATOR",
        title: "Classic style,<br>made personal.",
        body: "Here, no one sells you the first suit that happens to fit. Here, people listen, advise, and help you find a look that matches your occasion, character, and intent.",
        quote: "Status does not mean closed doors. At SENATOR, everyone is welcomed as a guest.",
        link: "HOW A VISIT UNFOLDS <span aria-hidden=\"true\">↗</span>",
        imageAlt: "A man adjusting a jacket cuff inside the salon interior"
      },
      manifesto: {
        title: "You have not said<br>a single word.",
        accent: "Your suit has already begun the conversation.",
        body: "A wedding. A graduation. A major deal. An official meeting. Or an ordinary day on which you choose to look the way your own standards demand."
      },
      hermose: {
        body: "Official representative in Ukraine. A Turkish menswear brand that combines classic tailoring, a modern cut, comfort, and expressive materials. SENATOR carries HERMOSE suits, blazers, shirts, and accessories for both business and evening looks.",
        fact: "MANUFACTURED · TURKEY",
        cta: "DISCOVER THE BRAND <span aria-hidden=\"true\">↗</span>",
        imageAlt: "Two men wearing HERMOSE suits, one light and one dark navy"
      },
      looks: {
        eyebrow: "SENATOR LOOKS",
        title: "Not a catalogue. A direction.",
        lead: "We do not show individual pieces, but characters you can assemble in the salon.",
        card1: { alt: "A man in a deep graphite business suit", name: "Power", desc: "Deep graphite · business cut" },
        card2: { alt: "A man in a light ivory-toned suit", name: "Presence", desc: "Light classic · a special occasion" },
        card3: { alt: "A man in a dark navy suit", name: "Intent", desc: "Deep navy · evening character" }
      },
      process: {
        title: "Your suit begins<br>with a conversation.",
        step1: { title: "Conversation", body: "We understand the occasion, your style, and the impression the look should create." },
        step2: { title: "Selection", body: "We offer a few precise options instead of dozens of random ones." },
        step3: { title: "Fitting", body: "We assess the fit, proportions, and every detail of the future look." }
      },
      story: {
        title: "17 years of character.",
        lead: "SENATOR began with a handful of suits and a small stall at the market. The market became the first address. But it was never a limit.",
        body: "Natalia built a business that kept growing regardless of circumstances. Beside her - Liudmyla, a friend and the shop's steady manager, who has walked almost the entire path together with SENATOR.",
        strongLine: "Crises. Relocations. COVID. War.",
        final: "Today it is a large boutique in the very heart of Mykolaiv and the official representative of HERMOSE in Ukraine.",
        link: "VISIT THE SALON <span aria-hidden=\"true\">↗</span>",
        imageAlt: "Close-up of hands adjusting a white cuff over a dark jacket"
      },
      visit: {
        eyebrow: "VISIT",
        title: "Your suit is waiting for<br>a personal introduction.",
        address: "69a Velyka Morska Street, Mykolaiv",
        hours: "Daily · 10:00-19:00",
        ctaPrimary: "GET DIRECTIONS <span aria-hidden=\"true\">↗</span>",
        ctaSecondary: "MESSAGE ON INSTAGRAM <span aria-hidden=\"true\">↗</span>"
      },
      footer: {
        tagline: "Status is not announced. It is worn.",
        copyright: "© 2026 SENATOR",
        toTop: "BACK TO TOP <span aria-hidden=\"true\">↑</span>"
      }
    }
  };

  function getValue(lang, path) {
    var parts = path.split(".");
    var node = dict[lang];
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return null;
      node = node[parts[i]];
    }
    return node;
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang === "en" ? "en" : "uk";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = getValue(lang, el.getAttribute("data-i18n"));
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var value = getValue(lang, el.getAttribute("data-i18n-html"));
      if (value != null) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var value = getValue(lang, el.getAttribute("data-i18n-alt"));
      if (value != null) el.setAttribute("aria-label", value);
    });

    var titleEl = document.querySelector("[data-i18n-title]");
    if (titleEl) {
      var titleValue = getValue(lang, titleEl.getAttribute("data-i18n-title"));
      if (titleValue != null) document.title = titleValue;
    }

    var metaEl = document.querySelector("[data-i18n-meta]");
    if (metaEl) {
      var metaValue = getValue(lang, metaEl.getAttribute("data-i18n-meta"));
      if (metaValue != null) metaEl.setAttribute("content", metaValue);
    }

    var toggleLabel = document.getElementById("lang-toggle-label");
    if (toggleLabel) toggleLabel.textContent = lang === "en" ? "UA" : "EN";

    var toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      toggleBtn.setAttribute(
        "aria-label",
        lang === "en" ? "Switch site language to Ukrainian" : "Змінити мову сайту на англійську"
      );
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    document.dispatchEvent(new CustomEvent("senator:langchange", { detail: { lang: lang } }));
  }

  function initLanguage() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var lang = stored === "en" || stored === "uk" ? stored : "uk";
    applyLanguage(lang);

    var toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var current = document.documentElement.lang === "en" ? "en" : "uk";
        applyLanguage(current === "en" ? "uk" : "en");
      });
    }
  }

  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.getElementById("menu-toggle");
    var nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    var close = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
  }

  function initReveal(reducedMotion) {
    var heroEl = document.querySelector(".hero");

    if (reducedMotion) {
      if (heroEl) heroEl.classList.add("is-revealed");
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    requestAnimationFrame(function () {
      if (heroEl) heroEl.classList.add("is-revealed");
    });

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  function initAmbientVideo(reducedMotion) {
    var videos = document.querySelectorAll(".media-video");
    if (!videos.length || reducedMotion) return;

    if (!("IntersectionObserver" in window)) {
      videos.forEach(function (video) {
        video.play().catch(function () {});
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.play().catch(function () {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js-ready");
    if (reducedMotion) document.documentElement.classList.add("js-no-motion");

    initLanguage();
    initHeaderScroll();
    initMobileNav();
    initReveal(reducedMotion);
    initAmbientVideo(reducedMotion);
  });
})();
