// ===== LOAD NAV COMPONENT =====
fetch("components/nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("nav").innerHTML = data;

        // ===== NAV TOGGLE (MOBILE) =====
        const toggle = document.querySelector(".nav-toggle");
        const navLinks = document.querySelector(".nav-links");

        if (toggle && navLinks) {
            toggle.addEventListener("click", () => {
                navLinks.classList.toggle("show");
            });

            // Close menu when a link is clicked (mobile UX)
            navLinks.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("show");
                });
            });
        }

        // ===== ACTIVE NAV LINK =====
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        const links = document.querySelectorAll(".nav-links a");
        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    })
    .catch(err => console.error("Nav load error:", err));


// ===== NAV SCROLL BEHAVIOR =====
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});


// ===== HERO ENTRANCE ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("hero");
    if (hero) {
        hero.classList.add("hero-visible");
    }
});