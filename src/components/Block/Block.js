import checkoutRedirection from '../../modules/redirection';

import './style.css';

export default function Block (elements, classes = '') {
    const container = document.createElement('div');

    container.className = `block ${classes}`;

    const components = elements.map((item) => {
        container.appendChild(item.element);
        return item;
    });

    const component = {
        element: container,
        init: (data) => {
            components.forEach((element) => {
                if (element.init) {
                    element.init(data);
                }
                if (element.setClickHandler) {
                    element.setClickHandler(() => checkoutRedirection('', data));
                }
            });
        },
        dispose: (data) => {
            components.forEach((element) => {
                if (element.dispose) {
                    element.dispose(data);
                }
            });
        }
    };

    return component;
}
