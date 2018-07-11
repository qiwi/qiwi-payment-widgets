import './style.css';
import {getContrastColorByBackground, styleCode, color, isBrowserSupportsSvg, imgSrcOrder} from '../../modules/helpers.js';

export default function PaymentIcons () {
    const paymentIcons = document.createElement('div');

    paymentIcons.className = 'widget__payment-block';

    paymentIcons.innerHTML = `
            <div class="widget__payment-type widget__payment-block-visa"></div>
            <div class="widget__payment-type widget__payment-block-mastercard"></div>
            <div class="widget__payment-type widget__payment-block-mir"></div>
            <div class="widget__payment-type widget__payment-block-qiwi"></div>`;

    const component = {
        element: paymentIcons,
        init: (data) => {
            const bgColor = data.widgetStyles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
            component.setBackground(bgColor);
        },
        setBackground: (widgetBackground) => {
            const contrastColor = getContrastColorByBackground(widgetBackground);
            const bgImageIndex = isBrowserSupportsSvg() ? imgSrcOrder.SVG : imgSrcOrder.PNG;
            const bgIndexInStyle = (contrastColor === color.WHITE ? 0 : 2) + bgImageIndex; // look in paymentIcons/style.css there are 4 backgrounds to choose

            const paymentMethods = component.element.querySelectorAll('[class*=widget__payment-block-]');

            paymentMethods.forEach(function (paymentMethod) {
                const backgrounds = window.getComputedStyle(paymentMethod).getPropertyValue('background-image').split(', url(');
                if (bgIndexInStyle > 0) {
                    backgrounds[bgIndexInStyle] = `url(${backgrounds[bgIndexInStyle]}`;
                }
                paymentMethod.style.backgroundImage = backgrounds[bgIndexInStyle];
            })
        },
        dispose: () => {
            component.element.style.display = 'none';
        }
    };

    return component;
}
