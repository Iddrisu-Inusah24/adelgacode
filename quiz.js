/* =============================================================
   QUIZ HUB — Behaviour
   Vanilla JS, IIFE-wrapped, runs on DOMContentLoaded.

   Responsibilities:
     1. Smooth scrolling for in-page anchors
     2. Fade-in sections as they enter the viewport
     3. Active / press feedback on Start Quiz buttons
        (and a hook for wiring real quiz navigation)
   ============================================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- 1. SMOOTH SCROLL ----------
           Intercepts clicks on <a href="#…"> and scrolls smoothly
           to the target. Real links (e.g. "#0") are ignored. */
        var anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        anchorLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                var targetId = this.getAttribute('href');
                if (!targetId || targetId.length < 2) return;

                var targetEl = document.querySelector(targetId);
                if (!targetEl) return;

                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });


        /* ---------- 2. FADE-IN ON SCROLL ---------- */
        var fadeTargets = document.querySelectorAll(
            '.qh-header, .qh-quizzes, .qh-instructions'
        );

        if (fadeTargets.length) {
            fadeTargets.forEach(function (el) {
                el.classList.add('qh-fade');
            });

            // IntersectionObserver path (modern browsers)
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target); // animate only once
                        }
                    });
                }, {
                    threshold: 0.12,
                    rootMargin: '0px 0px -40px 0px'
                });

                fadeTargets.forEach(function (el) {
                    observer.observe(el);
                });

            // Fallback: just show everything
            } else {
                fadeTargets.forEach(function (el) {
                    el.classList.add('is-visible');
                });
            }
        }


        /* ---------- 3. START QUIZ BUTTONS ----------
           Adds a subtle "press" effect, then runs whatever
           navigation logic you want to plug in. */
        var startButtons = document.querySelectorAll('.qh-btn-primary[data-quiz]');

        startButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                var quizId = this.getAttribute('data-quiz');

                // --- Active-press feedback (subtle scale-down on tap/click)
                this.style.transform = 'scale(0.97)';
                var self = this;
                setTimeout(function () { self.style.transform = ''; }, 140);

                // --- Prevent jumping to top while href="#"
                // ========================================================
                // TODO: Replace the line below with your real navigation.
                //   Examples:
                //     window.location.href = '/quizzes/' + quizId;
                //     window.location.href = '/quiz.html?id=' + encodeURIComponent(quizId);
                //     openModalForQuiz(quizId);
                // ========================================================
                console.log('[Quiz Hub] Starting quiz:', quizId);
            });
        });

    });

})();
