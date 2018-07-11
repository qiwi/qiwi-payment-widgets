import './style.css';
import {getContrastColorByBackground, styleCode} from '../../modules/helpers';

export default function Button ({
    classes = '',
    title = 'Помочь'
} = {}) {
    const container = document.createElement('div');

    container.innerHTML = `<button type="button" id="make-donation" class="widget__button ${classes}"></button>`;

    const button = container.firstChild;
    button.innerHTML = title;

    const component = {
        element: button,
        text: title,
        setClickHandler: (handler) => {
            component.element.addEventListener('click', handler);
        },
        _changeText: (text = 'Помочь') => {
            component.element.innerHTML = text;
        },
        _changeBackgroundColor: (color) => {
            component.element.style.backgroundColor = color;
            component.element.style.color = getContrastColorByBackground(color);
        },
        disable: () => {
            component._changeText('Ошибка');
            component.element.disabled = true;
        },
        enable: () => {
            component._changeText(component.text);
            component.element.disabled = false;
        },
        init: (data) => {
            component.text = data.widgetButtonText || title;
            component._changeText(component.text);
            if (data.widgetStyles[styleCode.BUTTON_BACKGROUND]) {
                component._changeBackgroundColor(data.widgetStyles[styleCode.BUTTON_BACKGROUND]);
            }
            component.enable();
        },
        dispose: () => {
            component.disable();
        }
    };

    return component;
}