import Widget from '../../modules/widget';
import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Oferta from '../../components/Oferta';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button({classes: 'widget__button-shadow'});
const widgetTitle = Title();
const widgetOferta = Oferta();

const elements = [widgetTitle, widgetButton, widgetPaymentIcons, widgetOferta];

const smallWdiget300x180 = new Widget(elements);

smallWdiget300x180.init();
