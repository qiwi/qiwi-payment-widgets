import './style.css';
import {getContrastColorByBackground, CHARITY_MARKETING_CATEGORY} from '../../modules/helpers';
import {styleCode, color} from '../../modules/styles';

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
            if (data.merchantMarketingCategory !== CHARITY_MARKETING_CATEGORY) component.dispose();

            component.addPublicKey(data.merchantSitePublicKey);
            const bgColor = data.widgetStyles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
            component.changeColor(bgColor);
        },
        changeColor: (backgroundColor) => {
            component.element.style.color = getContrastColorByBackground(backgroundColor);
        },
        dispose: () => {
            component.element.style.display = 'none';
        }
    };

    return component;
}
