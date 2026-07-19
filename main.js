(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------- Nav: solidify on scroll ---------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      if (scrollY > 60) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Nav: highlight link of section in view ---------- */
  function initSectionSpy() {
    var links = $$(".nav-link");
    if (!links.length) return;
    var linkByHash = {};
    links.forEach(function (a) { linkByHash[a.getAttribute("href")] = a; });

    var sections = $$("main [id]").filter(function (el) { return linkByHash["#" + el.id]; });
    if (!sections.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkByHash["#" + entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileNav() {
    var toggle = $("[data-nav-toggle]");
    var menu = $("[data-nav-mobile]");
    if (!toggle || !menu) return;
    var close = function () {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a, button", menu).forEach(function (a) { a.addEventListener("click", close); });
  }

  /* ---------- Smooth anchor scroll (native) ---------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 88;
      window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY - navOffset,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    });
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress() {
    var bar = $("[data-scroll-progress]");
    if (!bar) return;
    var raf = null;
    var update = function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      var pct = max > 0 ? scrollY / max : 0;
      bar.style.transform = "scaleX(" + pct + ")";
      raf = null;
    };
    window.addEventListener("scroll", function () {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------- Hero mouse-reactive gradient ---------- */
  function initHeroGradient() {
    var hero = $(".hero");
    var gradient = $("[data-mouse-gradient]");
    if (!hero || !gradient) return;
    if (!fineHover) return;
    var tx = 22, ty = 28, mx = 22, my = 28;
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    });
    function frame() {
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      gradient.style.setProperty("--mx", mx + "%");
      gradient.style.setProperty("--my", my + "%");
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Tilt 3D on cards / figures ---------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".has-tilt").forEach(function (card) {
      var MAX = 9;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (card.classList.contains("has-halo")) {
          card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        }
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------- Marquee (tech logo rows) ---------- */
  function initMarquee() {
    if (reducedMotion) return; // loop infinito: se omite, queda la fila estática (CLAUDE.md §13)
    $$("[data-marquee]").forEach(function (track) {
      track.classList.add("is-marquee");

      var clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.removeAttribute("data-reveal");
      clone.removeAttribute("data-reveal-delay");
      clone.classList.remove("is-revealed");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);

      var viewport = track.parentNode;
      var gapPx = parseFloat(getComputedStyle(viewport).columnGap) || 0;
      var distance = track.scrollWidth + gapPx;
      var speed = 34; // px/sec — kept slow for a discreet, elegant motion
      var duration = distance / speed;
      var styleTag = document.createElement("style");
      var animName = "marqueeScroll" + Math.random().toString(36).slice(2, 8);
      styleTag.textContent =
        "@keyframes " + animName + " { from { transform: translateX(0); } to { transform: translateX(-" + distance + "px); } }" +
        "[data-marquee-id='" + animName + "'], [data-marquee-clone='" + animName + "'] {" +
        " animation: " + animName + " " + duration + "s linear infinite; }";
      document.head.appendChild(styleTag);
      track.setAttribute("data-marquee-id", animName);
      clone.setAttribute("data-marquee-clone", animName);

      viewport.classList.add("has-marquee");
    });
  }

  /* ---------- Contact form: real submit via Web3Forms ---------- */
  var WEB3FORMS_ACCESS_KEY = "b3807a32-57ad-4b65-b4ee-c1ee74117ce5";

  function initContactForm() {
    $$("[data-contact-form]").forEach(wireContactForm);
  }

  function wireContactForm(form) {
    var scope = form.closest(".contact-card") || form.parentElement;
    var success = scope.querySelector("[data-contact-success]");
    if (!form || !success) return;
    var submitBtn = form.querySelector('[type="submit"]');
    var msg = scope.querySelector("[data-contact-success-msg]");
    var errorEl = form.querySelector("[data-contact-error]");
    var successMessage = success.getAttribute("data-success-message") ||
      "hemos recibido tu mensaje. Te escribimos en breve.";
    var eyebrowEl = scope.querySelector(".eyebrow");
    var titleEl = scope.querySelector(".modal-title");
    var leadEl = scope.querySelector(".modal-lead");
    var isModalForm = !!form.closest(".modal");
    var successTimer = null;

    function updateSubmitState() {
      if (submitBtn) submitBtn.disabled = !form.checkValidity();
    }
    form.addEventListener("input", updateSubmitState);
    form.addEventListener("change", updateSubmitState);
    updateSubmitState();

    var phoneField = form.elements.phone;
    if (phoneField) {
      phoneField.addEventListener("input", function () {
        var cleaned = phoneField.value.replace(/[^0-9+\s-]/g, "");
        if (cleaned !== phoneField.value) phoneField.value = cleaned;
      });
    }

    if (isModalForm) {
      form.addEventListener("formhardreset", function () {
        if (successTimer) { clearTimeout(successTimer); successTimer = null; }
        success.classList.remove("is-visible");
        success.setAttribute("aria-hidden", "true");
        form.classList.remove("is-sent");
        form.reset();
        updateSubmitState();
        if (errorEl) errorEl.hidden = true;
        if (eyebrowEl) eyebrowEl.hidden = false;
        if (titleEl) titleEl.hidden = false;
        if (leadEl) leadEl.hidden = false;
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-sending")) return;
      if (!form.reportValidity()) return;

      form.classList.add("is-sending");
      if (submitBtn) submitBtn.disabled = true;
      if (errorEl) errorEl.hidden = true;

      var nameField = form.elements.name;
      var firstName = nameField && nameField.value ? nameField.value.trim().split(/\s+/)[0] : "";

      var payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name", form.elements.name.value);
      payload.append("email", form.elements.email.value);
      payload.append("phone", form.elements.phone.value);
      payload.append("company", form.elements.company.value || "No proporcionado");
      payload.append("subject", "SOFTWORKS - " + form.elements.subject.value);
      payload.append("message", form.elements.message.value);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          form.classList.remove("is-sending");
          updateSubmitState();

          if (!data.success) throw new Error(data.message || "submit failed");

          if (msg) {
            msg.textContent = "";
            if (firstName) {
              var strong = document.createElement("strong");
              strong.textContent = firstName + ",";
              msg.appendChild(strong);
              msg.appendChild(document.createTextNode(" " + successMessage));
            } else {
              msg.textContent = successMessage.charAt(0).toUpperCase() + successMessage.slice(1);
            }
          }
          form.classList.add("is-sent");
          success.setAttribute("aria-hidden", "false");
          success.classList.add("is-visible");
          if (eyebrowEl) eyebrowEl.hidden = true;
          if (titleEl) titleEl.hidden = true;
          if (leadEl) leadEl.hidden = true;

          if (successTimer) clearTimeout(successTimer);
          successTimer = setTimeout(function () {
            success.classList.remove("is-visible");
            success.setAttribute("aria-hidden", "true");
            if (!isModalForm) {
              form.classList.remove("is-sent");
              form.reset();
              updateSubmitState();
              if (eyebrowEl) eyebrowEl.hidden = false;
              if (titleEl) titleEl.hidden = false;
              if (leadEl) leadEl.hidden = false;
            }
          }, 5000);
        })
        .catch(function () {
          form.classList.remove("is-sending");
          updateSubmitState();
          if (errorEl) errorEl.hidden = false;
        });
    });
  }

  /* ---------- Floating contact button (FAB): aparece tras scroll ---------- */
  function initFab() {
    var fab = $("[data-fab]");
    var toggle = $("[data-fab-toggle]");
    var panel = $("[data-fab-panel]");
    if (!fab || !toggle || !panel) return;

    var revealed = false;
    function maybeReveal() {
      if (revealed || scrollY <= innerHeight * 0.6) return;
      revealed = true;
      fab.hidden = false;
      requestAnimationFrame(function () { fab.classList.add("is-visible"); });
      window.removeEventListener("scroll", maybeReveal);
    }
    window.addEventListener("scroll", maybeReveal, { passive: true });
    maybeReveal();

    function close() {
      fab.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
    }
    function open() {
      fab.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      panel.setAttribute("aria-hidden", "false");
    }

    toggle.addEventListener("click", function () {
      if (fab.classList.contains("is-open")) close(); else open();
    });
    document.addEventListener("click", function (e) {
      if (fab.classList.contains("is-open") && !fab.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && fab.classList.contains("is-open")) { close(); toggle.focus(); }
    });
    $$("[data-fab-close]", panel).forEach(function (a) { a.addEventListener("click", close); });
  }

  /* ---------- Modales (agenda, política de datos...) — pueden anidarse ---------- */
  function initModals() {
    var modals = $$("[data-modal]");
    if (!modals.length) return;
    var stack = [];

    function getModal(id) {
      return modals.filter(function (m) { return m.getAttribute("data-modal") === id; })[0];
    }
    function open(modal, trigger) {
      if (!modal || modal.classList.contains("is-open")) return;
      stack.push({ modal: modal, trigger: trigger || document.activeElement });
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("has-modal-open");
      var firstField = modal.querySelector('input:not([type="hidden"]), textarea, .modal-close');
      if (firstField) firstField.focus();
    }
    function close(modal) {
      if (!modal || !modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      var entry = null;
      for (var i = stack.length - 1; i >= 0; i--) {
        if (stack[i].modal === modal) { entry = stack.splice(i, 1)[0]; break; }
      }
      if (!stack.length) document.documentElement.classList.remove("has-modal-open");
      if (entry && entry.trigger && entry.trigger.focus) entry.trigger.focus();

      var form = modal.querySelector("[data-contact-form]");
      if (form && !form.classList.contains("is-sending")) {
        form.dispatchEvent(new Event("formhardreset"));
      }
    }
    function topOpenModal() { return stack.length ? stack[stack.length - 1].modal : null; }

    $$("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(getModal(btn.getAttribute("data-open-modal") || "agenda"), btn);
      });
    });
    modals.forEach(function (modal) {
      $$("[data-modal-close]", modal).forEach(function (el) {
        el.addEventListener("click", function () { close(modal); });
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close(topOpenModal());
    });
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initSectionSpy, "initSectionSpy");
    safe(initMobileNav, "initMobileNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initScrollProgress, "initScrollProgress");
    safe(initReveals, "initReveals");
    safe(initHeroGradient, "initHeroGradient");
    safe(initTilt, "initTilt");
    safe(initMarquee, "initMarquee");
    safe(initContactForm, "initContactForm");
    safe(initFab, "initFab");
    safe(initModals, "initModals");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
