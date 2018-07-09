import './style.css';
import {getContrastColorByBackground, styleCode, color} from '../../modules/helpers';

export default function Link (publicKey = '') {
    const container = document.createElement('div');

    const widgetLink = 'https://widget.qiwi.com';

    container.innerHTML = `<a href="${widgetLink}?publicKey=${publicKey}" target="_blank" class="widget__be-partner" id="partner-link">QIWI #надобро</a>`;

    const link = container.firstChild;

    const component = {
        element: link,
        addPublicKey: (publicKey) => {
            link.href = `${widgetLink}?publicKey=${publicKey}`;
        },
        init: (data) => {
            component.addPublicKey(data.merchantSitePublicKey);
            const bgColor = data.widgetStyles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
            component.changeColor(bgColor);
        },
        changeColor: (backgroundColor) => {
            component.element.style.color = getContrastColorByBackground(backgroundColor);
        }
    };

    return component;
}
