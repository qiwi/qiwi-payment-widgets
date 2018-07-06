import './style.css';
import {getContrastColorByBackground, styleCode, color} from '../../modules/helpers';

export default function Link (public_key = '') {
    const container = document.createElement('div');

    const widgetLink = 'https://widget.qiwi.com';

    container.innerHTML = `<a href="${widgetLink}?public_key=${public_key}" target="_blank" class="widget__be-partner" id="partner-link">QIWI #надобро</a>`;

    const link = container.firstChild;

    const component = {
        element: link,
        addPublicKey: (public_key) => {
            link.href = `${widgetLink}?public_key=${public_key}`;
        },
        init: (data) => {
            component.addPublicKey(data.merchant_site_public_key);
            const bgColor = data.widget_styles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
            component.changeColor(bgColor);
        },
        changeColor: (backgroundColor) => {
            component.element.style.color = getContrastColorByBackground(backgroundColor);
        }
    };

    return component;
}
