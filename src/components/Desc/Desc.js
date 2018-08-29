import './style.css';
import {getContrastColorByBackground} from '../../modules/helpers';
import {styleCode, color} from '../../modules/styles';
import ErrorInfo from '../../modules/ErrorInfo'

export default function Desc ({showFromStart = true} = {}) {
    const desc = document.createElement('div');

    desc.className = 'widget__text';

    desc.innerHTML = ``;

    const component = {
        changeText: (text = '', textError = '') => {
            desc.innerHTML = text + textError;
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
            let textError = `<br>Описание ошибки: ${data.errorText || data}</br> <br>Код статуса: ${data.errorStatus}</br> <br>Описание кода ошибки: ${data.errorStatusText}</br><br>Url: ${data.errorUrl}</br>  `;
            if (!showFromStart) {
                component.element.classList.add('widget__desc--error');
                text = `Свяжитесь <br>с администратором сайта <br>или <a class="widget__mail" href="mailto:widget@qiwi.com">напишите в поддержку</a>`
                textError = `<br>${data.errorText || data}</br>`
            }
            component.changeText(text, textError);
        },
        element: desc
    };

    return component;
}
