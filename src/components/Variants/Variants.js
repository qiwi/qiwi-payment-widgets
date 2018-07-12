import './style.css';
import Button from '../Button';
import redirection from '../../modules/redirection';
import {numberWithSpaces} from '../../modules/parsers';

export default function Variants ({
    defaultValue = [100, 500],
    redirectionHandler = redirection
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
            const amounts = data.merchantPaymentSumAmount && data.merchantPaymentSumAmount.length && data.merchantPaymentSumAmount.length > 0
                ? data.merchantPaymentSumAmount
                : defaultValue;

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
        }
    };

    return component;
}
