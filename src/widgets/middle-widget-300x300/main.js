import '../../modules/polyfill'
import Widget, {EWidgetsTypes} from '../../modules/widget';


import Title from '../../components/Title';
import Desc from '../../components/Desc';
import PaymentIcons from '../../components/PaymentIcons';
import Link from '../../components/Link';
import Form from '../../components/Form';
import Oferta from '../../components/Oferta';

import './css/styles.css';

const widgetTitle = Title();
const widgetErrorDesc = Desc({showFromStart: false});
const widgetPaymentIcons = PaymentIcons();
const widgetLink = Link();
const widgetOferta = Oferta();
const widgetForm = Form({buttonClasses: 'widget__button-shadow'});

const elements = [widgetTitle, widgetErrorDesc, widgetForm, widgetPaymentIcons, widgetOferta, widgetLink];

const middleWidget300x300 = new Widget(elements, EWidgetsTypes.MIDDLE_WIDGET);

middleWidget300x300.init();
