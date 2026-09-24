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

  /* ---------- Modo presentación: el scroll "cambia de pantalla" ----------
     En escritorio, el panel que deja atrás se desvanece y se aleja ligeramente
     mientras el siguiente queda revelado debajo: se percibe como un cambio de
     sección, no como un desplazamiento. Solo cuando el deck está activo. */
  const deckPanels = document.querySelectorAll(".hero, .section, .site-footer");
  const deckQuery = window.matchMedia("(min-width: 1024px) and (min-height: 740px)");

  if (deckPanels.length && !prefersReducedMotion) {
    const clamp = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    let deckTicking = false;

    function updateDeckTransition() {
      deckTicking = false;

      if (!deckQuery.matches) {
        deckPanels.forEach(function (panel) {
          panel.style.opacity = "";
          panel.style.transform = "";
        });
        return;
      }

      const scrollTop = window.scrollY;

      deckPanels.forEach(function (panel) {
        const height = panel.offsetHeight;
        if (!height) return;

        const panelTop = panel.getBoundingClientRect().top + scrollTop;
        const out = clamp((scrollTop - panelTop) / height, 0, 1);

        if (out <= 0.22) {
          panel.style.opacity = "";
          panel.style.transform = "";
          return;
        }

        // El cambio arranca pasado el primer tramo y se desarrolla despacio,
        // con curva eased: transición larga y suave en vez de fade rápido.
        const start = (out - 0.22) / 0.78;
        const ease = Math.pow(start, 1.4);
        panel.style.opacity = (1 - ease).toFixed(3);
        panel.style.transform =
          "translate3d(0, " + (-ease * height * 0.05).toFixed(1) + "px, 0) scale(" +
          (1 - ease * 0.016).toFixed(4) + ")";
      });
    }

    const requestDeckTransition = function () {
      if (!deckTicking) {
        deckTicking = true;
        window.requestAnimationFrame(updateDeckTransition);
      }
    };

    /* Lenis: scroll sedoso (lerp) sin secuestrar la rueda ni sentirse atascado,
       más un "encaje" suave cuando la inercia se detiene: un gesto acaba en su
       sección, pero nunca bloquea el scroll. Solo en el modo deck. */
    const lastPanelIndex = deckPanels.length - 1;

    let lenis = null;
    let snapping = false;
    let lastSpeed = 0;
    let lastScrollTime = performance.now();
    let anchorIndex = 0;

    if (typeof window.Lenis === "function" && deckQuery.matches) {
      document.documentElement.classList.add("js-lenis");

      lenis = new window.Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        }
      });

      lenis.on("scroll", function (event) {
        lastSpeed = event.velocity;
        lastScrollTime = performance.now();
      });

      function checkSnap() {
        if (!lenis || snapping) {
          window.requestAnimationFrame(checkSnap);
          return;
        }

        const idle = performance.now() - lastScrollTime;
        if (idle < 130 && Math.abs(lastSpeed) > 0.4) {
          window.requestAnimationFrame(checkSnap);
          return;
        }

        const y = lenis.scroll;
        const anchorY = deckPanels[anchorIndex].offsetTop;
        const delta = y - anchorY;
        const panelH = deckPanels[anchorIndex].offsetHeight || 1;

        // Cualquier scroll real (adelante o atrás) cambia de panel; solo un
        // micro-desplazamiento accidental (< 5% de la pantalla) se queda quieto.
        let steps = 0;
        if (delta > panelH * 0.05) {
          steps = 1;
        } else if (delta < -panelH * 0.05) {
          steps = -1;
        }
        const targetIndex = clamp(anchorIndex + steps, 0, lastPanelIndex);
        const target = deckPanels[targetIndex].offsetTop;

        // El footer es la última pantalla: una vez alcanzado, se queda para
        // siempre (el scroll hacia abajo no lo hace marcharse).
        if (targetIndex === lastPanelIndex && steps > 0 && y >= target) {
          anchorIndex = targetIndex;
          snapping = false;
          return;
        }

        if (Math.abs(target - y) > 4) {
          snapping = true;
          const isFooter = deckPanels[targetIndex].classList.contains("site-footer");
          lenis.scrollTo(target, {
            duration: isFooter ? 3.5 : 0.6,
            easing: function (t) {
              return 1 - Math.pow(1 - t, 3);
            }
          });
          anchorIndex = targetIndex;
          window.setTimeout(function () {
            snapping = false;
          }, isFooter ? 3800 : 750);
        }

        window.requestAnimationFrame(checkSnap);
      }

      function rafDeck(time) {
        if (lenis) lenis.raf(time);
        window.requestAnimationFrame(rafDeck);
      }

      window.requestAnimationFrame(rafDeck);
      window.requestAnimationFrame(checkSnap);

      document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
          if (!lenis) return;
          const href = link.getAttribute("href");
          if (!href || href.length < 2) return;
          const target = document.querySelector(href);
          if (!target) return;
          event.preventDefault();
          snapping = true;
          lenis.scrollTo(target, { duration: 0.9, offset: 0 });
          window.setTimeout(function () {
            snapping = false;
          }, 1100);
        });
      });
    }

    window.addEventListener("scroll", requestDeckTransition, { passive: true });

    window.addEventListener("resize", function () {
      if (lenis) {
        if (!deckQuery.matches) {
          lenis.destroy();
          lenis = null;
          document.documentElement.classList.remove("js-lenis");
        } else {
          lenis.resize();
        }
      }
      requestDeckTransition();
    });

    window.addEventListener("load", function () {
      if (lenis) lenis.resize();
      requestDeckTransition();
    });

    if (!lenis) {
      requestDeckTransition();
    }
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