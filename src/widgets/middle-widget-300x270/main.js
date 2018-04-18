import Widget from '../../modules/widget';

import PaymentIcons from '../../components/PaymentIcons';
import Link from '../../components/Link';
import Form from '../../components/Form';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetLink = Link();
const widgetForm = Form();

const elements = [widgetForm, widgetPaymentIcons, widgetLink];

const middleWidget300x270 = new Widget(elements);

middleWidget300x270.init();
