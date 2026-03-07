(function () {
    const HEADER_ID = 'site-header';
    const PARTIAL_PATH = determineBasePrefix() + 'partials/header.html';

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        await loadHeader();
    }

    function determineBasePrefix() {
        const path = window.location.pathname;
        // If served from a subdirectory (e.g., GitHub Pages repo), keep relative logic intact.
        return path.includes('/pages/') ? '../' : './';
    }

    async function loadHeader() {
        const host = document.getElementById(HEADER_ID);
        if (!host) return;

        try {
            const response = await fetch(PARTIAL_PATH);
            if (!response.ok) throw new Error('Failed to load header partial');
            const markup = await response.text();
            host.innerHTML = markup;
            initializeNavigation(host);
        } catch (error) {
            console.error('[Header] load failed:', error);
        }
    }

    function initializeNavigation(scope) {
        const nav = scope.querySelector('.nav');
        const toggle = scope.querySelector('.nav-toggle');
        const links = scope.querySelectorAll('[data-nav-target]');

        // Resolve relative hrefs so links work from both root and /pages/
        const prefix = determineBasePrefix();
        links.forEach((link) => {
            const target = link.getAttribute('data-nav-target');
            if (target) {
                link.setAttribute('href', prefix + target);
            }
        });

        if (toggle && nav) {
            toggle.addEventListener('click', () => toggleMenu(nav, toggle));
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu(nav, toggle);
                }
            });
        }

        // Close menu on link click (mobile)
        nav?.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open')) {
                    toggleMenu(nav, toggle, false);
                }
            });
        });
    }

    function toggleMenu(nav, toggle, forceState) {
        const isOpen = typeof forceState === 'boolean' ? forceState : !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', isOpen);
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    }
})();
