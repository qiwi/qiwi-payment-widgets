import Widget from '../../modules/widget';
import redirection from '../../modules/redirection';

import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button();

const elements = [widgetButton, widgetPaymentIcons];

const smallButton175x65 = new Widget(elements);

smallButton175x65.init(
    (data) => {
        widgetButton.addHandler(() => redirection('', data));

        widgetButton.changeText(data.merchant_button_text[0]);

        widgetButton.enable();
    },
    () => {
        widgetButton.disable();
    }
);
