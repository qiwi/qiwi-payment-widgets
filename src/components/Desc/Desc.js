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
            let text = `Свяжитесь с администратором сайта или <a class="widget__mail" href="mailto:widget@qiwi.com">напишите в поддержку</a>`;
            if (!showFromStart) {
                component.element.classList.add('widget__desc--error');
                text = `Свяжитесь <br>с администратором сайта <br>или <a class="widget__mail" href="mailto:widget@qiwi.com">напишите в поддержку</a>`
            }
            component.changeText(text);
        },
        element: desc
    };

    return component;
}
