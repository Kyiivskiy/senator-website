(function () {
  "use strict";

  function normalize(str) {
    return str.toLocaleLowerCase("uk-UA");
  }

  function attach(input, getOptions) {
    var wrap = input.closest(".autosuggest");
    if (!wrap) return;

    var list = wrap.querySelector(".autosuggest-list");
    if (!list) return;

    var activeIndex = -1;
    var currentMatches = [];

    function close() {
      list.hidden = true;
      list.innerHTML = "";
      activeIndex = -1;
      currentMatches = [];
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }

    function selectValue(value) {
      input.value = value;
      close();
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function render() {
      var query = normalize(input.value.trim());
      if (!query) {
        close();
        return;
      }

      var all = getOptions();
      currentMatches = all
        .filter(function (item) { return normalize(item).indexOf(query) !== -1; })
        .slice(0, 8);

      if (!currentMatches.length) {
        close();
        return;
      }

      list.innerHTML = currentMatches
        .map(function (item, i) {
          return '<li role="option" id="' + input.id + '-option-' + i + '" data-index="' + i + '">' + item + "</li>";
        })
        .join("");
      list.hidden = false;
      activeIndex = -1;
      input.setAttribute("aria-expanded", "true");

      list.querySelectorAll("li").forEach(function (li) {
        li.addEventListener("mousedown", function (e) {
          e.preventDefault();
          selectValue(currentMatches[Number(li.getAttribute("data-index"))]);
        });
      });
    }

    function setActive(index) {
      var items = list.querySelectorAll("li");
      items.forEach(function (li) { li.classList.remove("is-active"); });
      if (index >= 0 && index < items.length) {
        items[index].classList.add("is-active");
        items[index].scrollIntoView({ block: "nearest" });
        input.setAttribute("aria-activedescendant", items[index].id);
      } else {
        input.removeAttribute("aria-activedescendant");
      }
      activeIndex = index;
    }

    input.setAttribute("autocomplete", "off");
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-controls", list.id);

    input.addEventListener("input", render);
    input.addEventListener("focus", function () {
      if (input.value.trim()) render();
    });

    input.addEventListener("keydown", function (e) {
      if (list.hidden) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(Math.min(activeIndex + 1, currentMatches.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(Math.max(activeIndex - 1, 0));
      } else if (e.key === "Enter") {
        if (activeIndex >= 0) {
          e.preventDefault();
          selectValue(currentMatches[activeIndex]);
        }
      } else if (e.key === "Escape") {
        close();
      }
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) close();
    });
  }

  window.SenatorAutosuggest = { attach: attach };
})();
