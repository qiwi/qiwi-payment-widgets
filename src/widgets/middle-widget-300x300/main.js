import Widget from '../../modules/widget';

import Title from '../../components/Title';
import PaymentIcons from '../../components/PaymentIcons';
import Link from '../../components/Link';
import Form from '../../components/Form';
import Oferta from '../../components/Oferta';

import './css/styles.css';

const widgetTitle = Title();
const widgetPaymentIcons = PaymentIcons();
const widgetLink = Link();
const widgetOferta = Oferta();
const widgetForm = Form();

const elements = [widgetTitle, widgetForm, widgetPaymentIcons, widgetOferta, widgetLink];

const middleWidget300x300 = new Widget(elements);

middleWidget300x300.init();
