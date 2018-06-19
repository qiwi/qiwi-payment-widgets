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
            component.element.style.display = 'block';
        },
        dispose: () => {
            container.dispose();
        }
    };
    return component;
}
