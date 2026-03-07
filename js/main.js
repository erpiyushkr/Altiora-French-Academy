(function () {
    const FOOTER_ID = 'site-footer';

    document.addEventListener('DOMContentLoaded', () => {
        loadFooter();
        initYear();
        initHeroTilt();
        if (window.AltioraAnimations) {
            window.AltioraAnimations.initScrollReveal();
            window.AltioraAnimations.initParallax();
            window.AltioraAnimations.initFloating();
        }
    });

    function determineBasePrefix() {
        const path = window.location.pathname;
        return path.includes('/pages/') ? '../' : './';
    }

    async function loadFooter() {
        const host = document.getElementById(FOOTER_ID);
        if (!host) return;

        const partialPath = determineBasePrefix() + 'partials/footer.html';
        try {
            const response = await fetch(partialPath);
            if (!response.ok) throw new Error('Failed to load footer partial');
            const markup = await response.text();
            host.innerHTML = markup;
            hydrateFooterLinks(host);
        } catch (error) {
            console.error('[Footer] load failed:', error);
        }
    }

    function hydrateFooterLinks(scope) {
        const prefix = determineBasePrefix();
        scope.querySelectorAll('[data-nav-target]').forEach((link) => {
            const target = link.getAttribute('data-nav-target');
            if (target) link.setAttribute('href', prefix + target);
        });
    }

    function initYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    function initHeroTilt() {
        const utils = window.AltioraUtils || {};
        if (utils.isReducedMotion && utils.isReducedMotion()) return;

        const visual = document.querySelector('.hero__visual[data-tilt]');
        const frame = visual?.querySelector('.hero-image-frame');
        if (!visual || !frame) return;

        const updateTilt = (event) => {
            const rect = frame.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
            frame.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        };

        const resetTilt = () => {
            frame.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };

        visual.addEventListener('mousemove', updateTilt);
        visual.addEventListener('mouseenter', updateTilt);
        visual.addEventListener('mouseleave', resetTilt);
    }
})();
