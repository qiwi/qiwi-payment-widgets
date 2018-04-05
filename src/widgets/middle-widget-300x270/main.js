
import Widget from '../../modules/widget';

import PaymentIcons from '../../components/PaymentIcons';
import Link from '../../components/Link';
import Form from '../../components/Form';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetLink = Link();
const widgetForm = Form();

widgetForm.disable();

const elements = [widgetForm, widgetPaymentIcons, widgetLink];

const middleWidget300x270 = new Widget(elements);

middleWidget300x270.init(
    (data) => {
        widgetForm.addMerchantInfo(data);

        widgetForm.enable();

        widgetLink.addPublicKey(data.merchant_public_key);
    },
    () => {
        widgetTitle.showError();
    }
);
