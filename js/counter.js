"use strict"

window.addEventListener("load", windowLoad);

function windowLoad() {
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters) {
            circle.classList.add("_active");

            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });

        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;

        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;

        const startValue = parseInt(digitsCounter.innerHTML);

        const startPosition = 0;

        const step = (timestamp) => {

            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));

            if (progress < 1) {

                window.requestAnimationFrame(step);

            }

        };
        window.requestAnimationFrame(step);
    }


    // При скролле

    let options = {
        threshold: 0.3
    }


    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");

                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
            } else {
                circle.classList.remove("_active");
            }
        });
    }, options);

    let sections1 = document.querySelectorAll('.service');
    let sections2 = document.querySelectorAll('.product');
    let circle = document.querySelector('.circle');

    if (sections1.length) {
        sections1.forEach(section => {
            observer.observe(section);

        });
    }
    if (sections2.length) {
        sections2.forEach(section => {
            observer.observe(section);
        });
    }
}