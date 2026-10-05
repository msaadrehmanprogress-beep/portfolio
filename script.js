/* =========================================
   SAAD REHMAN PORTFOLIO
   PROFESSIONAL JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================= */

    const body = document.body;

    const header =
        document.getElementById("header");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const themeToggle =
        document.getElementById("themeToggle");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const currentYear =
        document.getElementById("currentYear");

    const typingText =
        document.getElementById("typingText");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    currentYear.textContent =
        new Date().getFullYear();


    /* =========================================
       MOBILE MENU
    ========================================= */

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        body.classList.toggle("menu-open");

        const icon =
            menuToggle.querySelector("i");

        if (navMenu.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* =========================================
       CLOSE MOBILE MENU
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            body.classList.remove("menu-open");

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });


    /* =========================================
       THEME
    ========================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "light") {

        body.classList.add("light-theme");

        updateThemeIcon();

    }


    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-theme");

        const isLight =
            body.classList.contains("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });


    function updateThemeIcon() {

        const icon =
            themeToggle.querySelector("i");

        if (body.classList.contains("light-theme")) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

        }

    }


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            `${percentage}%`;

    }


    /* =========================================
       BACK TO TOP
    ========================================= */

    function updateBackToTop() {

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                });

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );

                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }


    /* =========================================
       HEADER SHADOW
    ========================================= */

    function updateHeader() {

        if (window.scrollY > 20) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,0.12)";

        } else {

            header.style.boxShadow = "none";

        }

    }


    /* =========================================
       SCROLL EVENTS
    ========================================= */

    window.addEventListener("scroll", () => {

        updateScrollProgress();

        updateBackToTop();

        updateActiveNavigation();

        updateHeader();

    });


    /* =========================================
       TYPING EFFECT
    ========================================= */

    const typingWords = [

        "Aspiring Python Developer",
        "Web Developer",
        "Computer Science Student",
        "Problem Solver"

    ];


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeEffect() {

        const currentWord =
            typingWords[wordIndex];


        if (!deleting) {

            characterIndex++;

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1800
                );

                return;

            }

        } else {

            characterIndex--;

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    typingWords.length;

            }

        }


        const speed =
            deleting ? 45 : 75;

        setTimeout(
            typeEffect,
            speed
        );

    }


    setTimeout(
        typeEffect,
        1200
    );


    /* =========================================
       CONTACT FORM
    ========================================= */

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const subject =
                document.getElementById("subject")
                    .value.trim();

            const message =
                document.getElementById("message")
                    .value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            if (!validateEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /*
                Since this is a frontend-only website,
                the form cannot actually send email
                without a backend/email service.

                For now we create a mailto link.
            */


            const mailtoLink =
                `mailto:msaadrehmanprogrss@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `${message}`
                )}`;


            showFormMessage(
                "Opening your email application...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    mailtoLink;

            }, 700);


            contactForm.reset();

        }
    );


    function validateEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }


    function showFormMessage(
        message,
        type
    ) {

        formMessage.textContent =
            message;

        if (type === "success") {

            formMessage.style.color =
                "#35d07f";

        } else {

            formMessage.style.color =
                "#ff6b6b";

        }


        setTimeout(() => {

            formMessage.textContent = "";

        }, 5000);

    }


    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".skill-card, .project-card, .stat-card, .timeline-item, .contact-item, .about-text, .contact-form"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================================
       PROJECT CARD STAGGER
    ========================================= */

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card"
        );


    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${(index % 3) * 0.08}s`;

    });


    /* =========================================
       INITIAL FUNCTIONS
    ========================================= */

    updateScrollProgress();

    updateBackToTop();

    updateActiveNavigation();

    updateHeader();


});
