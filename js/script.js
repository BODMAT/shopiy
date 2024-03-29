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
const menuLinks = document.querySelectorAll('.menu__link[data-goto],.menu2__link[data-goto]');
console.log(menuLinks);
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

//!Этот код трешак полный, но написан почти полностью мной и как первый сойдет, может потом оптимизирую =======================
document.addEventListener("DOMContentLoaded", function () {
    var textBox = document.querySelectorAll('.suptitle');
    textBox.forEach(element => {
        let text = element.innerText;
        let newHTML = '';

        for (let i = 0; i < text.length; i++) {
            newHTML += '<span>' + text[i] + '<span>';
        }
        element.innerHTML = newHTML;
    });

    // Получаем нужный элемент
    var allElements = document.querySelectorAll('.suptitle');
    allElements.forEach(element => {
        var Visible = function (target) {
            // Все позиции элемента
            var targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top,
                left: window.pageXOffset + target.getBoundingClientRect().left,
                right: window.pageXOffset + target.getBoundingClientRect().right,
                bottom: window.pageYOffset + target.getBoundingClientRect().bottom
            },
                // Получаем позиции окна
                windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };

            if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
                // Если элемент полностью видно, то запускаем следующий код
                element.classList.add("_active-suptitle");

                let spans = element.querySelectorAll('span'),
                    count = 0,
                    timeout = 0;

                //TEXT-PRINTING
                function typing_text() {
                    spans[count].classList.add('visible');
                    if (spans[count].innerText == ' ' || spans[count].innerHTML == ' ') {
                        timeout = Math.floor(Math.random() * Math.floor(100));
                        //spans[count].classList.add('cursor');
                    } else {
                        timeout = 30;
                        //spans[count].classList.remove('cursor');

                    }
                    if (count < element.textContent.length * 2 - 1) {
                        setTimeout(() => {
                            count++;
                            typing_text();
                        }, timeout);
                    }
                }
                const elem = element;
                document.addEventListener('scroll', onScroll);
                function onScroll() {
                    const posTop = elem.getBoundingClientRect().top;

                    if (posTop + elem.clientHeight <= window.innerHeight && posTop >= 0) {
                        elem.classList.add('visible');
                        document.removeEventListener('scroll', onScroll);

                        typing_text()
                    }

                }
                onScroll()
                element.removeAttribute("id");
            } else {
                // Если элемент не видно, то запускаем этот код
                element.classList.remove("_active-suptitle");

            };
        };
        // Запускаем функцию при прокрутке страницы
        window.addEventListener('scroll', function () {
            Visible(element);
        });
        // А также запустим функцию сразу. А то вдруг, элемент изначально видно
        Visible(element);
    });
});

//!============================================================================
// Получаем нужный элемент
var process = document.querySelector('.absolute-process');

var Visible = function (target) {
    // Все позиции элемента
    var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код
        process.classList.add("_active");
    } else {
        // Если элемент не видно, то запускаем этот код
        process.classList.remove("_active");
    };
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function () {
    Visible(process);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible(process);


//!=============
const input = document.querySelector('#clientInputCardnum');

/** Валидация цифр при вводе*/
input.addEventListener('keypress', function (evt) {
    if (evt.keyCode < 48 || evt.keyCode > 57) evt.preventDefault();
});


/** Оформление вывода по шаблону */
input.addEventListener('input', function (evt) {
    const pattern = '**** **** **** ****';
    let value = input.value;
    value = getCleanValue(value);
    value = getPatternedValue(value, pattern);
    input.value = value;
});

/** Возвращает очищенную строку (только цифры)*/
function getCleanValue(string) {
    let newString = '';
    for (let i = 0; i < string.length; i++) {
        if (+string[i]) newString += string[i];
    }
    return newString;
}

/** Возвращает оформленную по шаблону строку*/
function getPatternedValue(string, pattern) {
    let newString = '';
    let counter = 0;

    for (let i = 0; i < pattern.length; i++) {
        if (!string[counter]) continue;
        if (pattern[i] === '*') {
            newString += string[counter];
            counter++;
            continue;
        }
        newString += pattern[i];
    }

    return newString;
}


//! Инициализируем Swiper
const swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    // Количество слайов для показа
    slidesPerView: 1,
    speed: 600,
    // Отключение функционала
    // ecлu слайдов меньше чем нужно 
    watchOverflow: true,

    // Omcmyn между слайдами
    spaceBetween: 0,

    // Бесконечный слайдер
    //loop: true,
});

const mediaQuery = window.matchMedia('(max-width: 768.98px)');

if (mediaQuery.matches) {
    swiper.init();
    console.log("init");

} else {
    swiper.destroy();
    console.log("destroy");

}

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        // Количество слайов для показа
        slidesPerView: 1,
        speed: 600,
        // Отключение функционала
        // ecлu слайдов меньше чем нужно 
        watchOverflow: true,

        // Omcmyn между слайдами
        spaceBetween: 0,

        // Бесконечный слайдер
        //loop: true,
    });
    if (mediaQuery.matches) {
        swiper.init();
        console.log("init");

    } else {
        swiper.destroy();
        console.log("destroy");

    }
    swiper.update()
});
mediaQuery.addEventListener("change", () => {
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        // Количество слайов для показа
        slidesPerView: 1,
        speed: 600,
        // Отключение функционала
        // ecлu слайдов меньше чем нужно 
        watchOverflow: true,

        // Omcmyn между слайдами
        spaceBetween: 0,

        // Бесконечный слайдер
        //loop: true,
        initialSlide: 0,
    });
    if (mediaQuery.matches) {
        swiper.init();
        console.log("init");
    } else {
        swiper.destroy();
        console.log("destroy1");
    }
    swiper.update()
});
