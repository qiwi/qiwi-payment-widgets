import './style.css';
import {getTextColorByBackground, styleCode} from '../../modules/helpers';

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
            container.style.color = getTextColorByBackground(backgroundColor);
        },
        init: (data) => {
            if (data.merchant_offer) {
                component.addLink(data.merchant_offer);
                if (data.merchant_styles[styleCode.WIDGET_BACKGROUND]) {
                    component.changeColor(data.merchant_styles[styleCode.WIDGET_BACKGROUND]);
                }
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
