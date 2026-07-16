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
    $$("a", menu).forEach(function (a) { a.addEventListener("click", close); });
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
      var navOffset = 80;
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
      var MAX = 6;
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
    $$("[data-marquee]").forEach(function (track) {
      var clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);

      var distance = track.scrollWidth + 14;
      var speed = 34; // px/sec — kept slow for a discreet, elegant motion
      var duration = distance / speed;
      var styleTag = document.createElement("style");
      var animName = "marqueeScroll" + Math.random().toString(36).slice(2, 8);
      styleTag.textContent =
        "@keyframes " + animName + " { from { transform: translateX(0); } to { transform: translateX(-" + distance + "px); } }" +
        ".marquee-track[data-marquee-id='" + animName + "'], .marquee-track[data-marquee-clone='" + animName + "'] {" +
        " animation: " + animName + " " + duration + "s linear infinite; }";
      document.head.appendChild(styleTag);
      track.setAttribute("data-marquee-id", animName);
      clone.setAttribute("data-marquee-clone", animName);
    });
  }

  /* ---------- Contact form: real submit via Web3Forms ---------- */
  var WEB3FORMS_ACCESS_KEY = "85cac155-12df-4d61-abc7-de891546c128";

  function initContactForm() {
    var form = $("[data-contact-form]");
    var success = $("[data-contact-success]");
    if (!form || !success) return;
    var submitBtn = form.querySelector('[type="submit"]');
    var msg = $("[data-contact-success-msg]");
    var errorEl = $("[data-contact-error]", form);

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
      payload.append("subject", form.elements.subject.value);
      payload.append("message", form.elements.message.value);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          form.classList.remove("is-sending");
          if (submitBtn) submitBtn.disabled = false;

          if (!data.success) throw new Error(data.message || "submit failed");

          if (msg) {
            msg.textContent = firstName
              ? firstName + ", hemos recibido tu mensaje. Te escribimos en breve."
              : "Hemos recibido tu mensaje. Te escribimos en breve.";
          }
          form.classList.add("is-sent");
          success.setAttribute("aria-hidden", "false");
          success.classList.add("is-visible");
        })
        .catch(function () {
          form.classList.remove("is-sending");
          if (submitBtn) submitBtn.disabled = false;
          if (errorEl) errorEl.hidden = false;
        });
    });
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initMobileNav, "initMobileNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initScrollProgress, "initScrollProgress");
    safe(initReveals, "initReveals");
    safe(initHeroGradient, "initHeroGradient");
    safe(initTilt, "initTilt");
    safe(initMarquee, "initMarquee");
    safe(initContactForm, "initContactForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
