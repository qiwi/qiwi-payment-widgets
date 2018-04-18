import './style.css';
import redirection from '../../modules/redirection';

export default function Button ({
    classes = '',
    title = 'Помочь',
    redirectionHandler = redirection
} = {}) {
    const container = document.createElement('div');

    container.innerHTML = `<button type="button" id="make-donation" class="widget__button ${classes}">${title}</button>`;

    const button = container.firstChild;

    const component = {
        element: button,
        addHandler: (handler) => {
            button.addEventListener('click', handler);
        },
        changeText: (text = 'Помочь') => {
            button.innerHTML = text;
        },
        disable: () => {
            button.disabled = true;
        },
        enable: () => {
            button.disabled = false;
        },
        onSuccess: (data) => {
            component.addHandler(() => redirectionHandler('', data));
            component.changeText(data.merchant_button_text[0]);

            component.enable();
        },
        onError: (data) => {
            component.disable();
        }
    };

    return component;
}
