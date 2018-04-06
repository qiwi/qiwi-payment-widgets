import Widget from '../../modules/widget';
import redirection from '../../modules/redirection';

import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';
import Title from '../../components/Title';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button();
const widgetTitle = Title();

const elements = [widgetTitle, widgetButton, widgetPaymentIcons];

const smallWdiget300x180 = new Widget(elements);

smallWdiget300x180.init(
    (data) => {
        widgetButton.addHandler(() => redirection('', data));

        widgetTitle.changeTitle(data.merchant_name);

        widgetButton.changeText(data.merchant_button_text[0]);

        widgetButton.enable();
    },
    () => {
        widgetButton.disable();
        widgetTitle.showError();
    }
);
