(function () {
    const utils = window.AltioraUtils || {};

    function initScrollReveal() {
        const elements = utils.qsa ? utils.qsa('[data-reveal]') : [];
        if (!elements.length) return;

        if (utils.isReducedMotion && utils.isReducedMotion()) {
            elements.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        elements.forEach((el) => observer.observe(el));
    }

    function initParallax() {
        const elements = utils.qsa ? utils.qsa('[data-parallax]') : [];
        if (!elements.length || (utils.isReducedMotion && utils.isReducedMotion())) return;

        const onScroll = utils.throttle
            ? utils.throttle(() => {
                elements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const offset = (rect.top - window.innerHeight / 2) * 0.035;
                    el.style.transform = `translateY(${offset}px)`;
                });
            }, 24)
            : null;

        onScroll && window.addEventListener('scroll', onScroll, { passive: true });
        onScroll && onScroll();
    }

    function initFloating() {
        if (utils.isReducedMotion && utils.isReducedMotion()) return;
        // CSS handles floating via [data-float] animation; no JS needed here.
    }

    window.AltioraAnimations = {
        initScrollReveal,
        initParallax,
        initFloating,
    };
})();
