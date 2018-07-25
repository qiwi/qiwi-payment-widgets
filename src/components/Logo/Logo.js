import './style.css'
import {getImageByURL} from '../../modules/helpers';
import {styleCode} from '../../modules/styles';

export default function Logo () {
    const container = document.createElement('div');

    container.className = 'widget__image';

    const component = {
        element: container,
        init: (data) => {
            if (data.widgetStyles[styleCode.WIDGET_SQUARE_LOGO_URL]) {
                component.changeImage(data.widgetStyles[styleCode.WIDGET_SQUARE_LOGO_URL]);
            }
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
        },
        dispose: () => {
            component.element.style.display = 'none';
        }
    };

    return component;
}
