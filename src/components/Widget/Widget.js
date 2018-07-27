import './style.css';

import Block from '../Block';

export default function Widget (elements) {
    const container = new Block(elements, 'widget');

    const component = {
        element: container.element,
        init: (data) => {
            container.init(data);
        },
        show: () => {
            component.element.style.display = 'flex';
            component.element.style.flexDirection = 'column';
        },
        dispose: () => {
            component.element.classList.add('widget__error');
            container.dispose();
        }
    };
    return component;
}
