import './style.css';
import Button from '../Button';
import {checkoutRedirection} from '../../modules/redirection';
import {numberWithSpaces} from '../../modules/parsers';

export default function Variants ({
    redirectionHandler = checkoutRedirection
} = {}) {
    const container = document.createElement('div');

    container.className = 'widget__variants';

    let buttons = [];

    const component = {
        element: container,
        enable: () => {
            buttons.forEach((button) => button.enable());
        },
        disable: () => {
            buttons.forEach((button) => button.disable());
        },
        init: (data) => {
            data = Object.assign({}, data);
            let amounts = data.widgetPaymentSumAmount && data.widgetPaymentSumAmount.length > 0
                ? data.widgetPaymentSumAmount
                : [];

            if (amounts.length > 2) {
                amounts = amounts.slice(0, 3);
            }
            buttons = amounts.map((amount) => {
                const button = Button({
                    classes: 'widget__button--inline'
                });
                data.widgetButtonText = numberWithSpaces(amount) + '&#x20bd;';
                button.init(data);
                button.disable();

                if (data) {
                    button.setClickHandler(() => {
                        redirectionHandler(amount, data);
                    });
                }

                container.appendChild(button.element);

                return button;
            });
            component.enable();
        },
        dispose: () => {
            buttons.forEach((button) => button.dispose());
        }
    };

    return component;
}
