import './style.css'


export default function Logo() {
    const container = document.createElement('div');

    container.className = 'widget__image';

    const component = {
        element: container,
        init: (data) => {
            component.changeImage(data.merchant_icon_small_url);
        },
        changeImage: (url) => {
            isURLWithImageValid(url).then(function () {
                component.element.style.backgroundImage = `url(${url})`;
            });
        }
    };

    return component;
}

function isURLWithImageValid (url) {
    return new Promise(function (resolve) {
        let testImg = new Image(0, 0);

        let timedOut = false;
        let timer;
        testImg.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                testImg = null;
                resolve('success');
            }
        };
        testImg.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            testImg.src = '??/invalidUrl.jpg';
        }, 5000);
    })
}