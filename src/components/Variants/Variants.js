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

    let buttons = defaultValue.map((amount) => {
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
        init: (data) => {
            data = Object.assign({}, data);
            const amounts =
                data.merchant_payment_sum_amount.reverse() ||
                defaultValue;

            buttons = amounts.map((amount, index) => {
                const button = buttons[index];
                data.merchant_button_text = numberWithSpaces(amount) + '&#x20bd;';
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
