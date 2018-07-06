import './style.css'
import {isURLWithImageValid} from '../../modules/helpers';

export default function Logo () {
    const container = document.createElement('div');

    container.className = 'widget__image';

    const component = {
        element: container,
        init: (data) => {
            component.changeImage(data.widget_logo_url);
        },
        changeImage: (url) => {
            isURLWithImageValid(url).then(function () {
                component.element.style.backgroundImage = `url(${url})`;
            });
        }
    };

    return component;
}
