// utils.js
// Shared helpers for DOM queries, class handling, and perf-friendly callbacks.

(function () {
    function qs(selector, scope = document) {
        return scope.querySelector(selector);
    }

    function qsa(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    }

    function addClass(el, cls) {
        el?.classList.add(cls);
    }

    function removeClass(el, cls) {
        el?.classList.remove(cls);
    }

    function toggleClass(el, cls, force) {
        el?.classList.toggle(cls, force);
    }

    function debounce(fn, wait = 150) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    function throttle(fn, wait = 150) {
        let inThrottle, lastFn, lastTime;
        return function (...args) {
            const context = this;
            if (!inThrottle) {
                fn.apply(context, args);
                lastTime = Date.now();
                inThrottle = true;
            } else {
                clearTimeout(lastFn);
                lastFn = setTimeout(function () {
                    if (Date.now() - lastTime >= wait) {
                        fn.apply(context, args);
                        lastTime = Date.now();
                    }
                }, Math.max(wait - (Date.now() - lastTime), 0));
            }
        };
    }

    function isReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    window.AltioraUtils = {
        qs,
        qsa,
        addClass,
        removeClass,
        toggleClass,
        debounce,
        throttle,
        isReducedMotion,
    };
})();
