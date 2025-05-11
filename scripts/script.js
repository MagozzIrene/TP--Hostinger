const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

// Timer //
function initCountdown() {
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) {
        console.warn("Elemento del countdown no encontrado");
        return;
    }

    let duration = 2 * SECONDS_IN_DAY;

    const updateTimer = () => {
        const days = Math.floor(duration / SECONDS_IN_DAY);
        const hours = Math.floor((duration % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
        const minutes = Math.floor(
            (duration % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
        );
        const seconds = duration % SECONDS_IN_MINUTE;

        countdownEl.textContent = `${String(days).padStart(2, "0")}:${String(
            hours
        ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;

        if (--duration < 0) {
            clearInterval(timer);
            countdownEl.textContent = "¡Oferta finalizada!";
            countdownEl.classList.add("timer-ended");
        }
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
}

// Menu desplegable //

function initMobileMenu() {
    const toggleButton = document.querySelector(".navigation-section__toggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!toggleButton || !mobileMenu) {
        console.warn("Elementos del menú móvil no encontrados");
        return;
    }

    const handleMenuToggle = () => {
        const isOpen = mobileMenu.classList.toggle("mobile-menu--open");
        toggleButton.setAttribute("aria-expanded", isOpen.toString());

        document.body.style.overflow = isOpen ? "hidden" : "";
    };

    toggleButton.addEventListener("click", handleMenuToggle);

    const handleResize = () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove("mobile-menu--open");
            toggleButton.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }
    };

    window.addEventListener("resize", handleResize);

    return () => {
        toggleButton.removeEventListener("click", handleMenuToggle);
        window.removeEventListener("resize", handleResize);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initMobileMenu();
});

// Sombra //

function initHeaderShadow() {
    const header = document.querySelector('header');
    if (!header) return;

    const toggleShadow = () => {
        const hasScrolled = window.scrollY > 1;
        header.classList.toggle('scrolled', hasScrolled);
    };

    toggleShadow();
    window.addEventListener('scroll', toggleShadow);
}

document.addEventListener('DOMContentLoaded', initHeaderShadow);