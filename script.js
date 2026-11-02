// ===================================
// ASHISH'S PORTFOLIO - script.js
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. Typed.js animation
    const typedElement = document.querySelector("#element");

    if (typedElement && typeof Typed !== "undefined") {
        new Typed("#element", {
            strings: [
                "Web Developer",
                "Graphic Designer",
                "Web Designer",
                "Video Editor"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1200,
            loop: true
        });
    }

    // 2. Mobile navigation menu
    const nav = document.querySelector("nav");
    const navRight = document.querySelector("nav .right");
    const navList = document.querySelector("nav ul");

    if (nav && navRight && navList) {
        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.innerHTML = "&#9776;";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");

        nav.appendChild(menuButton);

        menuButton.addEventListener("click", () => {
            const isOpen = navRight.classList.toggle("active");

            menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu after clicking a navigation link
        navList.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navRight.classList.remove("active");
                menuButton.innerHTML = "&#9776;";
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 3. Smooth scrolling for internal section links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 4. Reveal elements when they enter the screen
    const revealElements = document.querySelectorAll(
        ".firstSection, .secondSection, .vertical, footer"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }

    // 5. Back-to-top button
    const topButton = document.createElement("button");

    topButton.className = "back-to-top";
    topButton.innerHTML = "&#8593;";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.hidden = true;

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        topButton.hidden = window.scrollY < 300;
    }, { passive: true });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 6. Highlight the navigation link for the current section
    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll("nav ul a").forEach(link => {
                        const matches =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active-link", matches);

                        if (matches) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                }
            });
        }, { threshold: 0.35 });

        sections.forEach(section => sectionObserver.observe(section));
    }

});