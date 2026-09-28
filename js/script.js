/* ============================================================
   Lii-iT — скрипты лендинга
   - Аккордеон услуг
   - Переключение языка RU / EN
   - Переключатель темы A / C
   - Мобильное меню (бургер)
   - Автоматический год в футере
   ============================================================ */

(function () {
    'use strict';

    /* ============================================================
       1. АККОРДЕОН УСЛУГ
       ============================================================ */
    const accordionItems = document.querySelectorAll('.accordion__item');

    accordionItems.forEach(function (item) {
        const header = item.querySelector('.accordion__header');
        if (!header) return;

        header.addEventListener('click', function () {
            const isOpen = item.classList.contains('is-open');

            // Закрываем все остальные (режим "только один открыт")
            accordionItems.forEach(function (other) {
                other.classList.remove('is-open');
            });

            // Открываем текущий, если он был закрыт
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });


    /* ============================================================
       2. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА RU / EN
       ============================================================ */
    const langSwitch = document.getElementById('langSwitch');
    const langCurrent = langSwitch ? langSwitch.querySelector('.lang-switch__current') : null;
    let currentLang = localStorage.getItem('lii-it-lang') || 'ru';

    function applyLang(lang) {
        // Меняем все элементы с data-ru / data-en
        document.querySelectorAll('[data-ru][data-en]').forEach(function (el) {
            const text = el.getAttribute('data-' + lang);
            if (text) el.textContent = text;
        });

        // Меняем атрибут lang у <html>
        document.documentElement.setAttribute('lang', lang);

        // Обновляем надпись на кнопке
        if (langCurrent) {
            langCurrent.textContent = lang.toUpperCase();
        }

        // Запоминаем выбор
        localStorage.setItem('lii-it-lang', lang);
        currentLang = lang;
    }

    if (langSwitch) {
        langSwitch.addEventListener('click', function () {
            const nextLang = currentLang === 'ru' ? 'en' : 'ru';
            applyLang(nextLang);
        });
    }

    // Применяем сохранённый язык при загрузке
    applyLang(currentLang);


     /* ============================================================
       3. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ DARK / LIGHT
       ============================================================ */
    const themeSwitch = document.getElementById('themeSwitch');
    let currentTheme = localStorage.getItem('lii-it-theme') || 'dark';

    function applyTheme(theme) {
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add('theme-' + theme);

        if (themeSwitch) {
            themeSwitch.textContent = theme === 'dark' ? '☾' : '☀';
            themeSwitch.setAttribute(
                'title',
                theme === 'dark' ? 'Тёмная тема (нажмите для светлой)' : 'Светлая тема (нажмите для тёмной)'
            );
        }

        localStorage.setItem('lii-it-theme', theme);
        currentTheme = theme;
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('click', function () {
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    applyTheme(currentTheme);


    /* ============================================================
       4. МОБИЛЬНОЕ МЕНЮ (бургер)
       ============================================================ */
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            nav.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
        });

        // Закрываем меню при клике по ссылке
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('is-active');
                nav.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            });
        });
    }


    /* ============================================================
       5. АВТОМАТИЧЕСКИЙ ГОД В ФУТЕРЕ
       ============================================================ */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ============================================================
       6. АКТИВНАЯ ССЫЛКА В МЕНЮ ПРИ СКРОЛЛЕ
       ============================================================ */
    const navLinks = document.querySelectorAll('.nav__list a');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            'is-active',
                            link.getAttribute('href') === '#' + id
                        );
                    });
                }
            });
        }, {
            rootMargin: '-30% 0px -60% 0px'  // срабатывает, когда секция в верхней части экрана
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    /* ============================================================
       7. ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ПРИ СКРОЛЛЕ
       ============================================================ */
    const revealElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .benefit, .price-card, .process__step, .about__text, .about__facts'
    );

    if (revealElements.length && 'IntersectionObserver' in window) {
        // Сразу помечаем все как «скрытые»
        revealElements.forEach(function (el) {
            el.classList.add('reveal');
        });

        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target); // дальше не следим
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    /* ============================================================
       8. КНОПКА «НАВЕРХ»
       ============================================================ */
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('is-visible');
            } else {
                scrollTopBtn.classList.remove('is-visible');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();