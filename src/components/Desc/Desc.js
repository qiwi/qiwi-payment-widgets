import './style.css';
import {getContrastColorByBackground} from '../../modules/helpers';
import {styleCode, color} from '../../modules/styles';
import ErrorInfo from '../../modules/ErrorInfo'

export default function Desc ({showFromStart = true, classes = ''} = {}) {
    const desc = document.createElement('div');

    desc.className = 'widget__text';

    desc.innerHTML = ``;

    const component = {
        changeText: (text = '', textError = '') => {
            desc.innerHTML = textError + text;
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
            let text = `<br><br>Пожалуйста, свяжитесь с администратором сайта или <a class="widget__mail" href="mailto:widget@qiwi.com">напишите в поддержку</a></br></<br>`;
            let textError = `${data.errorText || data}`;
            if (!showFromStart) {
                component.element.classList.add('widget__desc--error');
                text = `<br><br>Пожалуйста, свяжитесь с администратором <br> сайта или <a class="widget__mail" href="mailto:widget@qiwi.com">напишите в поддержку</a></br></br></br>`;
                textError = `${data.errorText || data}`
            }
            if (classes !== '') {
                desc.className = classes
            }
            component.changeText(text, textError);
        },
        element: desc
    };

    return component;
}
