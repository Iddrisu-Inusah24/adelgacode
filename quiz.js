/* ==========================================================================
   QUIZ HUB — JAVASCRIPT
   Sections:
     1. Mobile navigation toggle
     2. Smooth scrolling for in-page links
     3. Active navigation highlighting (scroll spy)
     4. Sticky header shadow on scroll
     5. FAQ accordion
     6. Quiz category filter
     7. Scroll-reveal animations
     8. Back-to-top button
     9. Footer year
   All sections are self-contained — remove any block you don't need
   without affecting the others.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------------------------
     1. MOBILE NAVIGATION TOGGLE
     ----------------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu whenever a nav link is clicked
    navMenu.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------------------------
     2. SMOOTH SCROLLING FOR IN-PAGE LINKS
     (CSS `scroll-behavior: smooth` already handles most of this; this JS
     covers browsers/elements where extra control or offset is needed.)
     ----------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length <= 1) return; // ignore bare "#" links

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* -----------------------------------------------------------------------
     3. ACTIVE NAVIGATION HIGHLIGHTING (scroll spy)
     ----------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => spyObserver.observe(section));
  }

  /* -----------------------------------------------------------------------
     4. STICKY HEADER SHADOW ON SCROLL
     ----------------------------------------------------------------------- */
  const siteHeader = document.getElementById("siteHeader");

  function updateHeaderShadow() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  updateHeaderShadow();
  window.addEventListener("scroll", updateHeaderShadow, { passive: true });

  /* -----------------------------------------------------------------------
     5. FAQ ACCORDION
     ----------------------------------------------------------------------- */
  const accordionTriggers = document.querySelectorAll(".accordion__trigger");

  accordionTriggers.forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    // Ensure closed panels start fully collapsed
    panel.style.maxHeight = "0px";

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // Close every other item first (single-open accordion behaviour)
      accordionTriggers.forEach((otherTrigger) => {
        if (otherTrigger === trigger) return;
        otherTrigger.setAttribute("aria-expanded", "false");
        otherTrigger.nextElementSibling.style.maxHeight = "0px";
      });

      // Toggle the clicked item
      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
    });
  });

  /* -----------------------------------------------------------------------
     6. QUIZ CATEGORY FILTER
     ----------------------------------------------------------------------- */
  const filterChips = document.querySelectorAll(".filter-chip");
  const quizCards = document.querySelectorAll(".quiz-card:not(.quiz-card--template)");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;

      // Update active chip state
      filterChips.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");

      // Show/hide quiz cards based on category match
      quizCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.style.display = matches ? "" : "none";
      });
    });
  });

  /* -----------------------------------------------------------------------
     7. SCROLL-REVEAL ANIMATIONS
     Adds [data-reveal] to key elements on load, then fades/slides them
     in the first time they enter the viewport.
     ----------------------------------------------------------------------- */
  const revealSelectors = [
    ".quiz-card",
    ".instructions-list li",
    ".accordion__item",
    ".contact-card",
  ];

  const revealTargets = document.querySelectorAll(revealSelectors.join(","));
  revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        // Small stagger for elements revealing together
        setTimeout(() => entry.target.classList.add("is-revealed"), index * 60);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------------------------
     8. BACK-TO-TOP BUTTON
     ----------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    function toggleBackToTop() {
      backToTopBtn.classList.toggle("is-visible", window.scrollY > 480);
    }
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------------------------------
     9. FOOTER YEAR
     ----------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
