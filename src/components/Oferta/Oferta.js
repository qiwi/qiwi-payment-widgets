import './style.css';
import {getContrastColorByBackground, styleCode, color} from '../../modules/helpers';

export default function Oferta (link = '') {
    const container = document.createElement('div');

    container.className = 'widget__oferta';

    container.innerHTML = `Совершая оплату, вы соглашаетесь с <a href="${link}" target="_blank" class="widget__oferta-link" id="oferta-link">офертой</a>`;

    const anchor = container.querySelector('a');

    const component = {
        element: container,
        addLink: (link) => {
            anchor.href = link;
        },
        show: () => {
            container.style.display = 'block';
        },
        hide: () => {
            container.style.display = 'none';
        },
        changeColor: (backgroundColor) => {
            container.style.color = getContrastColorByBackground(backgroundColor);
        },
        init: (data) => {
            if (data.widget_merchant_offer) {
                component.addLink(data.widget_merchant_offer);
                const bgColor = data.widget_styles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
                component.changeColor(bgColor);
                component.show();
                document.body.classList.add('block_oferted');
            } else {
                component.hide();
            }
        },
        dispose: () => {
            component.hide();
        }
    };

    return component;
}
