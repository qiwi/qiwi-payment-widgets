import './style.css';
import {getContrastColorByBackground, styleCode} from '../../modules/helpers';

export default function Button ({
    classes = '',
    title = 'Помочь'
} = {}) {
    const container = document.createElement('div');

    container.innerHTML = `<button type="button" id="make-donation" class="widget__button ${classes}">${title}</button>`;

    const button = container.firstChild;

    const component = {
        element: button,
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
            component.element.disabled = true;
        },
        enable: () => {
            component.element.disabled = false;
        },
        init: (data) => {
            component._changeText(data.widget_button_text || title);
            if (data.widget_styles[styleCode.BUTTON_BACKGROUND]) {
                component._changeBackgroundColor(data.widget_styles[styleCode.BUTTON_BACKGROUND]);
            }
            component.enable();
        },
        dispose: () => {
            component.disable();
        }
    };

    return component;
}