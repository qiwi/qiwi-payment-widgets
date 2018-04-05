import Widget from '../../modules/widget';

import Title from '../../components/Title';
import PaymentIcons from '../../components/PaymentIcons';
import Desc from '../../components/Desc';
import Link from '../../components/Link';
import Forms from '../../components/Forms';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Variants from '../../components/Variants';
import Block from '../../components/Block';

import './css/styles.css';

let defaultVariants = [50, 100, 500];

const widgetTitle = Title();
const widgetPaymentIcons = PaymentIcons();
const widgetDesc = Desc();
const widgetLink = Link();
const widgetFormTrigger = Button('widget__button--inline', 'Другая сумма');
const widgetBlock = Block([widgetPaymentIcons, widgetLink], 'widget__footer');

const widgetVariants = Variants(defaultVariants);

widgetVariants.disable();

const widgetForm = Form();

const widgetForms = Forms([
    {
        form: widgetVariants,
        triggerToNext: widgetFormTrigger
    },
    {
        form: widgetForm
    }
]);

widgetForms.disable();

const elements = [widgetTitle, widgetDesc, widgetForms, widgetBlock];

const bigWidget728x200 = new Widget(elements);

bigWidget728x200.init(
    (data) => {
        widgetDesc.changeText(data.merchant_widget_description);

        widgetTitle.changeTitle(data.merchant_name);

        widgetVariants.addMerchantInfo(data);

        widgetForm.addMerchantInfo(data);

        widgetLink.addPublicKey(data.merchant_public_key);

        widgetVariants.enable();

        widgetForms.enable();
    },
    () => {
        widgetTitle.showError();
    }
);
