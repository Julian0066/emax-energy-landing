/* EMAX Energía — Interacciones del cliente */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Navegación móvil ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navMenu.classList.toggle("is-open", !open);
      navToggle.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-label", "Abrir menú");
      });
    });

    document.addEventListener("click", function (event) {
      const insideHeader = event.target.closest(".site-header");
      const isOpen = navMenu.classList.contains("is-open");
      if (isOpen && !insideHeader) {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      }
    });
  }

  /* ---------- Cabecera con sombra al hacer scroll ---------- */
  const header = document.querySelector(".site-header");

  function updateHeaderShadow() {
    if (window.scrollY > 8) {
      header.style.borderBottomColor = "rgba(14, 43, 41, 0.14)";
      header.style.boxShadow = "0 6px 24px rgba(14, 43, 41, 0.08)";
    } else {
      header.style.borderBottomColor = "";
      header.style.boxShadow = "";
    }
  }

  if (header) {
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
    updateHeaderShadow();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Parallax sutil en el visual del hero ---------- */
  const heroSection = document.querySelector(".hero");
  const heroVisual = document.querySelector(".hero__visual");

  if (heroSection && heroVisual && !prefersReducedMotion) {
    const clamp = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    let ticking = false;

    function updateHeroParallax() {
      const rect = heroSection.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      const shift = clamp(-progress * 44, -22, 22);
      heroVisual.style.translate = "0 " + shift.toFixed(1) + "px";
      ticking = false;
    }

    function requestParallax() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeroParallax);
      }
    }

    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax, { passive: true });
    updateHeroParallax();
  }

  /* ---------- Formulario: validación + envío simulado ---------- */
  const form = document.getElementById("lead-form");
  const formError = document.getElementById("form-error");
  const formSuccess = document.getElementById("form-success");
  const resetBtn = document.getElementById("reset-form");
  const submitBtn = document.getElementById("submit-btn");

  const validators = {
    "f-nombre": function (value) {
      return value.trim().length >= 2;
    },
    "f-telefono": function (value) {
      return /^[+()\d\s.-]{9,17}$/.test(value.trim());
    },
    "f-email": function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
    },
    "f-consent": function (value, input) {
      return input.checked;
    }
  };

  function validateField(input) {
    const validate = validators[input.id];
    const valid = validate ? validate(input.value, input) : true;
    input.classList.toggle("is-invalid", !valid);
    return valid;
  }

  function validateForm() {
    let allValid = true;
    Object.keys(validators).forEach(function (id) {
      const input = document.getElementById(id);
      if (input && !validateField(input)) {
        allValid = false;
      }
    });
    return allValid;
  }

  function showFormError(show) {
    formError.hidden = !show;
  }

  if (form) {
    form.addEventListener(
      "input",
      function (event) {
        if (event.target.classList.contains("is-invalid")) {
          validateField(event.target);
        }
        if (!formError.hidden && validateForm()) {
          showFormError(false);
        }
      },
      true
    );

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        showFormError(true);
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      const originalLabel = submitBtn.querySelector(".btn__label");
      originalLabel.textContent = "Enviando…";
      submitBtn.disabled = true;

      window.setTimeout(function () {
        form.hidden = true;
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center"
        });
        submitBtn.disabled = false;
        originalLabel.textContent = "Quiero mi revisión gratuita";
        form.reset();
      }, 900);
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        formSuccess.hidden = true;
        form.hidden = false;
        form.querySelectorAll(".is-invalid").forEach(function (input) {
          input.classList.remove("is-invalid");
        });
        showFormError(false);
      });
    }
  }
})();