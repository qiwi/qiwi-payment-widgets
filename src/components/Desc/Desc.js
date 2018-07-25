import './style.css';
import {getContrastColorByBackground} from '../../modules/helpers';
import {styleCode, color} from '../../modules/styles';

export default function Desc ({showFromStart = true} = {}) {
    const desc = document.createElement('div');

    desc.className = 'widget__text';

    desc.innerHTML = ``;

    const component = {
        changeText: (text = '') => {
            desc.innerHTML = text;
        },
        changeColor: (backgroundColor) => {
            desc.style.color = getContrastColorByBackground(backgroundColor);
        },
        init: (data) => {
            if (showFromStart) {
                component.changeText(data.widgetDescription);
                const bgColor = data.widgetStyles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
                component.changeColor(bgColor);
            } else {
                component.element.style.display = 'none';
            }
        },
        dispose: (data) => {
            if (!showFromStart) {
                component.element.classList.add('widget__desc--error');
            }
            component.changeText(`Свяжитесь с администратором сайта или <a href="mailto:widget@qiwi.com">напишите в поддержку</a>`);
        },
        element: desc
    };

    return component;
}
