import Widget from '../../modules/widget';
import redirection from '../../modules/redirection';

import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';

import './css/styles.css';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button();

const elements = [widgetButton, widgetPaymentIcons];

const middleButton200x80 = new Widget(elements);

middleButton200x80.init();
