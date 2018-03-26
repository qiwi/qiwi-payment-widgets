import './style.css';
import Button from '../Button';
import redirection from '../../modules/redirection';
import { numberWithSpaces } from '../../modules/parsers';

export default function Variants (defaultValue) {
    const container = document.createElement('div');

    container.className = 'widget__variants';

    let buttons = defaultValue.map((amount, index) => {
        const button = Button(
            'widget__button--inline',
            numberWithSpaces(amount) + '&#x20bd;'
        );

        button.disable();

        container.appendChild(button.element);

        return button;
    });

    return {
        element: container,
        enable: () => {
            buttons.forEach((button) => button.enable());
        },
        disable: () => {
            buttons.forEach((button) => button.disable());
        },
        addMerchantInfo: (merchantInfo = {}) => {
            const amounts =
                merchantInfo.merchant_payment_sum_amount.reverse() ||
                defaultValue;

            buttons = amounts.map((amount, index) => {
                const button = buttons[index];

                button.changeText(numberWithSpaces(amount) + '&#x20bd;');

                button.disable();

                if (merchantInfo) {
                    button.addHandler(() => {
                        redirection(amount, merchantInfo);
                    });
                }

                container.appendChild(button.element);

                return button;
            });
        }
    };
}
