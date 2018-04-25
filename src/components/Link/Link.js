import './style.css';

export default function Link (public_key = '') {
    const container = document.createElement('div');

    const widgetLink = 'https://widget.qiwi.com';

    container.innerHTML = `<a href="${widgetLink}?public_key=${public_key}" target="_blank" class="widget__be-partner" id="partner-link">У меня есть сайт</a>`;

    const link = container.firstChild;

    const component = {
        element: link,
        addPublicKey: (public_key) => {
            link.href = `${widgetLink}?public_key=${public_key}`;
        },
        onSuccess: (data) => {
            component.addPublicKey(data.merchant_public_key);
        }
    };

    return component;
}
