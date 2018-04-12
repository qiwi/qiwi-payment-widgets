import Widget from '../../modules/widget';

import Title from '../../components/Title';
import PaymentIcons from '../../components/PaymentIcons';
import Link from '../../components/Link';
import Form from '../../components/Form';

import './css/styles.css';

const widgetTitle = Title();
const widgetPaymentIcons = PaymentIcons();
const widgetLink = Link();
const widgetForm = Form();

const elements = [widgetTitle, widgetForm, widgetPaymentIcons, widgetLink];

const middleWidget300x300 = new Widget(elements);

middleWidget300x300.init(
    (data) => {
        widgetTitle.changeTitle(data.merchant_name);

        widgetForm.addMerchantInfo(data);

        widgetForm.enable();

        widgetLink.addPublicKey(data.merchant_public_key);
    },
    () => {
        widgetTitle.showError();

        widgetForm.disable();
    }
);
