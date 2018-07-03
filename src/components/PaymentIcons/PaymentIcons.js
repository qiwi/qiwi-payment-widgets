import './style.css';
import {getContrastColorByBackground, styleCode, color} from '../../modules/helpers.js';

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
            if (data.merchant_styles[styleCode.WIDGET_BACKGROUND]) {
                component.setBackground(data.merchant_styles[styleCode.WIDGET_BACKGROUND]);
            } else {
                component.setBackground(color.WHITE);
            }
        },
        setBackground: (widgetBackground) => {
            const contrastColor = getContrastColorByBackground(widgetBackground);
            const bgIndexInStyle = contrastColor === color.WHITE ? 0 : 1;
            const paymentMethods = component.element.querySelectorAll('[class*=widget__payment-block-]');

            paymentMethods.forEach(function (paymentMethod) {
                const backgrounds = window.getComputedStyle(paymentMethod).getPropertyValue('background-image').split(', url(');
                if (bgIndexInStyle === 1) {
                    backgrounds[bgIndexInStyle] = `url(${backgrounds[bgIndexInStyle]}`;
                }
                paymentMethod.style.backgroundImage = backgrounds[bgIndexInStyle];
            })
        }
    };

    return component;
}
