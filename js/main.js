fetch("components/nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("nav").innerHTML = data;
    })
    .catch(err => console.error("Nav load error:", err));



// Nav scroll behavior
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Active nav link
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("hero");

    if (hero) {
        hero.classList.add("hero-visible");
    }
});