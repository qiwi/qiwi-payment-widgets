import './style.css';
import {getTextColorByBackground} from '../../modules/helpers';

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
        show: (public_key) => {
            container.style.display = 'block';
        },
        hide: (public_key) => {
            container.style.display = 'none';
        },
        changeColor: (backgroundColor) => {
            container.style.color = getTextColorByBackground(backgroundColor);
        },
        init: (data) => {
            if (data.merchant_offer) {
                component.addLink(data.merchant_offer);
                component.changeColor(data.merchant_widget_background);
                component.show();
                document.body.classList.add('block_oferted');
            } else {
                component.hide();
            }
        },
        dispose: (data) => {
            component.hide();
        }
    };

    return component;
}
