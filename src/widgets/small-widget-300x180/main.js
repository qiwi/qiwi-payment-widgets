import '../../modules/polyfill'
import Widget, {EWidgetsTypes} from '../../modules/widget';
import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';
import Title from '../../components/Title';

import './css/styles.css';
import Desc from '../../components/Desc';

const widgetPaymentIcons = PaymentIcons();
const widgetButton = Button({classes: 'widget__button-shadow'});
const widgetTitle = Title();
const widgetErrorDesc = Desc({showFromStart: false});

const elements = [widgetTitle, widgetErrorDesc, widgetButton, widgetPaymentIcons];

const smallWidget300x180 = new Widget(elements, EWidgetsTypes.SMALL_WIDGET);

smallWidget300x180.init();
