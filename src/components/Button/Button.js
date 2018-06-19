import './style.css';
import {getTextColorByBackground} from '../../modules/helpers';

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
            component.element.style.color = getTextColorByBackground(color);
        },
        disable: () => {
            component.element.disabled = true;
        },
        enable: () => {
            component.element.disabled = false;
        },
        init: (data) => {
            component._changeText(data.merchant_button_text || title);
            if (data.merchant_button_background) {
                component._changeBackgroundColor(data.merchant_button_background);
            }
            component.enable();
        },
        dispose: () => {
            component.disable();
        }
    };

    return component;
}