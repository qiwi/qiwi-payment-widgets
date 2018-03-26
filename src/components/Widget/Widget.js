import './style.css';

import Block from '../Block';

export default function Widget (elements) {
    const container = Block(elements, 'widget').element;

    return {
        element: container,
        show: () => {
            container.style.display = 'block';
        }
    };
}
