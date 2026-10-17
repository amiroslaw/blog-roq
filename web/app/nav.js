(function () {
    function init() {
        var aside = document.querySelector('.sidebar.main');
        var toggle = document.querySelector('.nav-toggle');
        if (!aside || !toggle) return;

        var icon = toggle.querySelector('i');
        var mobile = window.matchMedia('(max-width: 767px)');

        function setOpen(open) {
            aside.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }

        toggle.addEventListener('click', function () {
            setOpen(!aside.classList.contains('nav-open'));
        });

        aside.querySelectorAll('.sidebar-nav a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (mobile.matches) setOpen(false);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
