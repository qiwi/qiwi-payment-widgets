import './style.css'
import {isURLWithImageValid} from '../../modules/helpers';

export default function Logo () {
    const container = document.createElement('div');

    container.className = 'widget__image';

    const component = {
        element: container,
        init: (data) => {
            component.changeImage(data.widgetLogoUrl);
        },
        changeImage: (url) => {
            isURLWithImageValid(url).then(function () {
                let img = new Image();
                img.onload = function () {
                    if (this.width >= 128 || this.height >= 128) {
                        component.element.style.backgroundSize = 'contain';
                    } else {
                        component.element.style.backgroundSize = 'auto';
                    }
                    component.element.style.backgroundImage = `url(${url})`;
                };
                img.src = url;
            });
        }
    };

    return component;
}
