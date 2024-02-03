"use strict"

//! Simple preloader 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.wrapper').classList.add('active');
});

// Меню бургер 
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
//! MY
let calc = 1;
const menuLinkToAddClass = document.querySelectorAll(".menu__link");

if (iconMenu) {

    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');

        //! MY
        menuLinkToAddClass.forEach(link => {
            link.classList.toggle('_active');
            link.classList.toggle("menu__link_" + calc);
            calc++;
        });
        calc = 1;
    });
}

// При скролле
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
                //!MY
                menuLinkToAddClass.forEach(link => {
                    link.classList.remove('_active');
                    link.classList.remove("menu__link_" + calc);
                    calc++;
                });
                calc = 1;
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}