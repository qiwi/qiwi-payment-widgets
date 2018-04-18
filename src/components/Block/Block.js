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
        onSuccess: (data) => {
            components.forEach((element) => {
                if (element.onSuccess) {
                    element.onSuccess(data);
                }
            });
        },
        onError: (data) => {
            components.forEach((element) => {
                if (element.onError) {
                    element.onError(data);
                }
            });
        }
    };

    return component;
}
