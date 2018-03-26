import './style.css';

export default function Button (classes = '', title = 'Помочь') {
    const container = document.createElement('div');

    container.innerHTML = `<button type="button" id="make-donation" class="widget__button ${classes}">${title}</button>`;

    const button = container.firstChild;

    return {
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
        }
    };
}
