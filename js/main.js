(function () {
    const FOOTER_ID = 'site-footer';

    document.addEventListener('DOMContentLoaded', () => {
        loadFooter();
        initYear();
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
})();
