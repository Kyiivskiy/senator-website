(function () {
  "use strict";

  function initHeaderScroll(reducedMotion) {
    var group = document.getElementById("header-group");
    var header = document.getElementById("site-header");
    if (!group || !header) return;
    var lastScroll = window.scrollY;
    var onScroll = function () {
      var current = window.scrollY;
      header.classList.toggle("is-scrolled", current > 40);
      if (reducedMotion) return;
      if (current > lastScroll && current > 160) {
        group.classList.add("is-hidden");
      } else {
        group.classList.remove("is-hidden");
      }
      lastScroll = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* The header is fixed, so body reserves its height as padding and the hero
     subtracts it from 100svh. Publish the measured value; CSS holds a default
     for the first paint. Only the resting height counts — the header shrinks
     once scrolled, and the reserved space must not shrink with it. */
  function initHeaderHeight() {
    var group = document.getElementById("header-group");
    if (!group) return;

    var publish = function () {
      var header = document.getElementById("site-header");
      if (header && header.classList.contains("is-scrolled")) return;
      // ceil, not round: reserving a fraction less would let the first
      // section slide a pixel under the header
      document.documentElement.style.setProperty(
        "--header-h", Math.ceil(group.getBoundingClientRect().height) + "px"
      );
    };

    publish();
    // the web fonts land after this runs and change the header's height by a
    // fraction of a pixel — measure again once they are in
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(publish);
    window.addEventListener("resize", publish, { passive: true });
    // a resize while scrolled is skipped above (wrong state to measure in);
    // re-publish once the visitor is back at the top to pick the change up
    window.addEventListener("scroll", function () {
      if (window.scrollY <= 0) publish();
    }, { passive: true });
  }

  function initProductGallery() {
    var gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    var shots = gallery.querySelectorAll(".product-gallery-stage img");
    var dots = gallery.querySelectorAll(".product-gallery-dots button");
    if (shots.length < 2) return;

    var current = 0;

    var show = function (index) {
      current = (index + shots.length) % shots.length;
      shots.forEach(function (img, i) {
        img.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
      });
    };

    var prev = gallery.querySelector(".gallery-prev");
    var next = gallery.querySelector(".gallery-next");
    if (prev) prev.addEventListener("click", function () { show(current - 1); });
    if (next) next.addEventListener("click", function () { show(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });

    gallery.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
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
    var headings = Array.prototype.filter.call(document.querySelectorAll("main h2"), function (el) {
      return !el.closest(".legal-page");
    });
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

  document.addEventListener("DOMContentLoaded", function () {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js-ready");
    if (reducedMotion) document.documentElement.classList.add("js-no-motion");

    initHeaderHeight();
    initHeaderScroll(reducedMotion);
    initProductGallery();
    initMobileNav();
    initReveal(reducedMotion);
    initHeroParallax(reducedMotion);
    initSplitReveal(reducedMotion);
    initMagnetic(reducedMotion);
  });
})();
