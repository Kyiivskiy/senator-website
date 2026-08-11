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
        catalog: "Каталог",
        fitting: "Записатися на примірку"
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
        productNote: "Наявність розміру та кількості уточнює менеджер під час дзвінка.",
        productCtaFitting: "ЗАПИСАТИСЯ НА ПРИМІРКУ <span aria-hidden=\"true\">↗</span>",
        productCtaConsultation: "ЗАМОВИТИ КОНСУЛЬТАЦІЮ ПО ТЕЛЕФОНУ <span aria-hidden=\"true\">↗</span>",
        fittingEyebrow: "ЗАПИС",
        fittingTitle: "Записатися на примірку",
        fittingLead: "Залиште контакти - менеджер зателефонує, щоб узгодити зручний час і розповісти про товар.",
        consultationEyebrow: "КОНСУЛЬТАЦІЯ",
        consultationTitle: "Замовити консультацію по телефону",
        consultationLead: "Залиште номер - менеджер зателефонує і розповість про наявність, розміри та ціни.",
        checkoutContactLegend: "Контактні дані",
        formName: "Ім'я та прізвище",
        formPhone: "Телефон",
        formPreferredTime: "Зручний час",
        formPreferredTimePlaceholder: "Наприклад: сьогодні після 18:00",
        formCallTime: "Зручний час для дзвінка",
        formCallTimePlaceholder: "Наприклад: будь-коли, або після 17:00",
        formProduct: "Товар, що цікавить",
        formProductNone: "Ще не обрав(ла) / не важливо",
        formErrorRequired: "Заповніть це поле",
        formConsent: "Погоджуюсь з <a href=\"privacy.html\" target=\"_blank\">політикою конфіденційності</a>",
        fittingSubmitCta: "ЗАПИСАТИСЯ НА ПРИМІРКУ <span aria-hidden=\"true\">↗</span>",
        consultationSubmitCta: "ЗАМОВИТИ КОНСУЛЬТАЦІЮ <span aria-hidden=\"true\">↗</span>",
        callDirectly: "Або зателефонуйте нам напряму: <a href=\"tel:+380631840915\">+380 63 184 09 15</a> (основний) · <a href=\"tel:+380933835654\">+380 93 383 56 54</a> (додатковий)",
        confirmEyebrow: "ЗАЯВКУ ПРИЙНЯТО",
        confirmTitle: "Дякуємо! Ми скоро зв'яжемося.",
        confirmBody: "Менеджер СЕНАТОРА зателефонує вам найближчим часом, щоб узгодити деталі.",
        confirmBackHome: "НА ГОЛОВНУ",
        confirmToCatalog: "ДО КАТАЛОГУ <span aria-hidden=\"true\">↗</span>"
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
        privacy: "Конфіденційність",
        toTop: "НАГОРУ <span aria-hidden=\"true\">↑</span>"
      },
      legal: {
        privacyEyebrow: "ПРАВОВА ІНФОРМАЦІЯ",
        privacyTitle: "Політика конфіденційності",
        enNotice: "Цей документ регулюється законодавством України і надається лише українською мовою. Щоб отримати роз'яснення англійською, зв'яжіться з нами через Instagram.",
        draftNotice: "Це чернетка, а не юридична консультація. Перед публікацією реквізити [У ДУЖКАХ] потрібно замінити на реальні, а весь текст варто показати бухгалтеру або юристу."
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
        catalog: "Catalog",
        fitting: "Book a fitting"
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
        productNote: "The manager will confirm size and availability by phone.",
        productCtaFitting: "BOOK A FITTING <span aria-hidden=\"true\">↗</span>",
        productCtaConsultation: "REQUEST A CALL BACK <span aria-hidden=\"true\">↗</span>",
        fittingEyebrow: "BOOKING",
        fittingTitle: "Book a fitting",
        fittingLead: "Leave your details and the manager will call to arrange a convenient time and tell you about the product.",
        consultationEyebrow: "CONSULTATION",
        consultationTitle: "Request a phone consultation",
        consultationLead: "Leave your number and the manager will call to tell you about availability, sizes, and prices.",
        checkoutContactLegend: "Contact details",
        formName: "Full name",
        formPhone: "Phone",
        formPreferredTime: "Convenient time",
        formPreferredTimePlaceholder: "E.g. today after 6pm",
        formCallTime: "Convenient time to call",
        formCallTimePlaceholder: "E.g. anytime, or after 5pm",
        formProduct: "Product of interest",
        formProductNone: "Not decided yet / doesn't matter",
        formErrorRequired: "Please fill in this field",
        formConsent: "I agree to the <a href=\"privacy.html\" target=\"_blank\">privacy policy</a>",
        fittingSubmitCta: "BOOK A FITTING <span aria-hidden=\"true\">↗</span>",
        consultationSubmitCta: "REQUEST A CALL BACK <span aria-hidden=\"true\">↗</span>",
        callDirectly: "Or call us directly: <a href=\"tel:+380631840915\">+380 63 184 09 15</a> (main) · <a href=\"tel:+380933835654\">+380 93 383 56 54</a> (alternative)",
        confirmEyebrow: "REQUEST RECEIVED",
        confirmTitle: "Thank you! We'll be in touch soon.",
        confirmBody: "A SENATOR manager will call you shortly to arrange the details.",
        confirmBackHome: "BACK TO HOME",
        confirmToCatalog: "BROWSE CATALOG <span aria-hidden=\"true\">↗</span>"
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
        privacy: "Privacy",
        toTop: "BACK TO TOP <span aria-hidden=\"true\">↑</span>"
      },
      legal: {
        privacyEyebrow: "LEGAL INFORMATION",
        privacyTitle: "Privacy Policy",
        enNotice: "This document is governed by Ukrainian law and provided in Ukrainian only. For an explanation in English, please contact us via Instagram.",
        draftNotice: "This is a draft, not legal advice. Before publishing, replace the [BRACKETED] placeholders with real business details, and have the full text reviewed by an accountant or lawyer."
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

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var value = getValue(lang, el.getAttribute("data-i18n-placeholder"));
      if (value != null) el.setAttribute("placeholder", value);
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

  function initHeaderScroll(reducedMotion) {
    var header = document.getElementById("site-header");
    if (!header) return;
    var lastScroll = window.scrollY;
    var onScroll = function () {
      var current = window.scrollY;
      header.classList.toggle("is-scrolled", current > 40);
      if (reducedMotion) return;
      if (current > lastScroll && current > 160) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }
      lastScroll = current;
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

  function initHeroParallax(reducedMotion) {
    var hero = document.querySelector(".hero");
    var media = document.querySelector(".hero-media");
    if (!hero || !media || reducedMotion) return;

    var ready = false;
    media.addEventListener("transitionend", function (e) {
      if (e.propertyName === "transform") {
        media.classList.add("is-parallax-ready");
        ready = true;
      }
    });

    var ticking = false;
    var update = function () {
      ticking = false;
      if (!ready) return;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var offset = Math.max(-40, Math.min(40, window.scrollY * 0.12));
      media.style.transform = "scale(1.06) translateY(" + Math.round(offset) + "px)";
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  function splitIntoWordNodes(parent) {
    var result = [];
    parent.childNodes.forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            result.push(document.createTextNode(part));
            return;
          }
          var outer = document.createElement("span");
          outer.className = "split-word";
          var inner = document.createElement("span");
          inner.className = "split-word__inner";
          inner.textContent = part;
          outer.appendChild(inner);
          result.push(outer);
        });
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName === "BR") {
          result.push(document.createElement("br"));
        } else {
          var clone = document.createElement(child.tagName);
          for (var i = 0; i < child.attributes.length; i++) {
            clone.setAttribute(child.attributes[i].name, child.attributes[i].value);
          }
          splitIntoWordNodes(child).forEach(function (n) {
            clone.appendChild(n);
          });
          result.push(clone);
        }
      }
    });
    return result;
  }

  var splitObserver = null;

  function initSplitReveal(reducedMotion) {
    var headings = document.querySelectorAll("main h2");
    if (!headings.length) return;

    headings.forEach(function (el) {
      var nodes = splitIntoWordNodes(el);
      el.innerHTML = "";
      nodes.forEach(function (n) {
        el.appendChild(n);
      });
      el.classList.add("split-text");

      el.querySelectorAll(".split-word__inner").forEach(function (word, i) {
        word.style.transitionDelay = i * 40 + "ms";
      });
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      headings.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (splitObserver) splitObserver.disconnect();
    splitObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            splitObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    headings.forEach(function (el) {
      splitObserver.observe(el);
    });
  }

  function initMagnetic(reducedMotion) {
    if (reducedMotion || !window.matchMedia("(hover: hover)").matches) return;

    document.querySelectorAll(".btn-solid, .btn-outline, .btn-outline-light").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        el.style.transition = "transform 0.1s linear";
        el.style.transform = "translate(" + (relX * 0.25).toFixed(1) + "px, " + (relY * 0.25).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transition = "transform 0.4s var(--ease)";
        el.style.transform = "translate(0, 0)";
      });
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
    initHeaderScroll(reducedMotion);
    initMobileNav();
    initReveal(reducedMotion);
    initHeroParallax(reducedMotion);
    initSplitReveal(reducedMotion);
    initMagnetic(reducedMotion);
    initAmbientVideo(reducedMotion);

    document.addEventListener("senator:langchange", function () {
      initSplitReveal(reducedMotion);
    });
  });
})();
