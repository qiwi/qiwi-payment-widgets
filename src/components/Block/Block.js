import './style.css';

export default function Block (elements, classes = '') {
    const container = document.createElement('div');

    container.className = `block ${classes}`;

    elements.forEach((item) => {
        container.appendChild(item.element);
    });

    return {
        element: container
    };
}
