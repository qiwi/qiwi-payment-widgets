import '../../modules/polyfill'
import Widget from '../../modules/widget';
import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Oferta from '../../components/Oferta';

import './css/styles.css';
import Desc from '../../components/Desc';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button({classes: 'widget__button-shadow'});
const widgetTitle = Title();
const widgetErrorDesc = Desc({showFromStart: false});
const widgetOferta = Oferta();

const elements = [widgetTitle, widgetErrorDesc, widgetButton, widgetPaymentIcons, widgetOferta];

const smallWidget300x180 = new Widget(elements);

smallWidget300x180.init();
