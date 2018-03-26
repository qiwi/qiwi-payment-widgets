import Widget from '../../modules/widget';
import { redirection } from '../../modules/parsers';

import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button();

const elements = [widgetButton, widgetPaymentIcons];

const bigButton220x100 = new Widget(elements);

bigButton220x100.init(
    (data) => {
        widgetButton.addHandler(() => {
            redirection('', data);
        });

        widgetButton.changeText(data.merchant_button_text[0]);

        widgetButton.enable();
    },
    () => {
        widgetButton.disable();
    }
);
