import './style.css';
import Button from '../Button';
import redirection from '../../modules/redirection';
import { numberWithSpaces } from '../../modules/parsers';

export default function Variants ({
    defaultValue = [50, 100, 500],
    redirectionHandler = redirection
} = {}) {
    const container = document.createElement('div');

    container.className = 'widget__variants';

    let buttons = defaultValue.map((amount, index) => {
        const button = Button({
            classes: 'widget__button--inline',
            title: numberWithSpaces(amount) + '&#x20bd;'
        });

        button.disable();

        container.appendChild(button.element);

        return button;
    });

    const component = {
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
                if (merchantInfo.merchant_button_background) {
                    button.changeBackgroundColor(merchantInfo.merchant_button_background);
                }
                button.disable();

                if (merchantInfo) {
                    button.addHandler(() => {
                        redirectionHandler(amount, merchantInfo);
                    });
                }

                container.appendChild(button.element);

                return button;
            });
        },
        onSuccess: (data) => {
            component.addMerchantInfo(data);
            component.enable();
        }
    };

    return component;
}
