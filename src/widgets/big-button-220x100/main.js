import Widget from '../../modules/widget';

import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';

import Oferta from '../../components/Oferta';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button();
const widgetOferta = Oferta();

const elements = [widgetButton, widgetPaymentIcons, widgetOferta];

const bigButton220x100 = new Widget(elements);

bigButton220x100.init();
