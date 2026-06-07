(function () {
    const PAGE = document.body.dataset.page || '';
    const EMAIL = 'www44victor@gmail.com';
    const PHONE = '+255616509415';

    function setActiveNav() {
        document.querySelectorAll('[data-nav]').forEach(function (link) {
            const nav = link.dataset.nav;
            const isActive =
                (PAGE === 'home' && nav === 'home') ||
                (PAGE === nav) ||
                (PAGE === 'services' && nav === 'services') ||
                (PAGE === 'contact' && nav === 'contact');
            if (isActive) {
                link.classList.add('text-primary', 'border-b', 'border-primary', 'pb-1');
                link.classList.remove('text-on-surface-variant');
            }
        });
        document.querySelectorAll('[data-mobile-nav]').forEach(function (link) {
            if (link.dataset.mobileNav === PAGE) {
                link.classList.add('text-primary');
            }
        });
    }

    function initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('mobile-menu-close');
        if (!btn || !menu) return;

        function openMenu() {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            document.body.style.overflow = '';
        }

        btn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeMenu);
        });
    }

    function initCtaButtons() {
        document.querySelectorAll('[data-action="contact"]').forEach(function (el) {
            el.addEventListener('click', function () {
                window.location.href = 'mailto:' + EMAIL;
            });
        });
        document.querySelectorAll('[data-action="call"]').forEach(function (el) {
            el.addEventListener('click', function () {
                window.location.href = 'tel:' + PHONE;
            });
        });
    }

    function initNavHideOnScroll() {
        const header = document.getElementById('site-header');
        if (!header) return;
        let lastScroll = 0;
        window.addEventListener('scroll', function () {
            const current = window.pageYOffset;
            if (current <= 0) {
                header.style.transform = 'translateY(0)';
                return;
            }
            header.style.transform = current > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
            lastScroll = current;
        });
    }

    function setLayoutOffsets() {
        const header = document.getElementById('site-header');
        const subnav = document.getElementById('site-subnav');
        if (!header) return;

        const headerH = header.offsetHeight;
        const subnavH = subnav ? subnav.offsetHeight : 0;
        const gap = 16;

        document.documentElement.style.setProperty('--site-header-h', headerH + 'px');
        document.documentElement.style.setProperty('--site-subnav-h', subnavH + 'px');
        document.documentElement.style.setProperty('--site-content-pt', (headerH + gap) + 'px');
        document.documentElement.style.setProperty('--site-hero-pt', (headerH + subnavH + gap) + 'px');
    }

    document.addEventListener('DOMContentLoaded', function () {
        setLayoutOffsets();
        window.addEventListener('resize', setLayoutOffsets);
        window.addEventListener('load', setLayoutOffsets);
        setActiveNav();
        initMobileMenu();
        initCtaButtons();
        initNavHideOnScroll();
    });
})();
