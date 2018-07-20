import './style.css'
import {getImageByURL} from '../../modules/helpers';

export default function Logo() {
    const container = document.createElement('div');

    container.className = 'widget__image';

    const component = {
        element: container,
        init: (data) => {
            component.changeImage(data.widgetLogoUrl);
        },
        changeImage: (url) => {
            getImageByURL(url).then(function (img) {
                if (img.width >= 128 || img.height >= 128) {
                    component.element.style.backgroundSize = 'contain';
                } else {
                    component.element.style.backgroundSize = 'auto';
                }
                component.element.style.backgroundImage = `url(${url})`;
            });
        }
    };

    return component;
}
