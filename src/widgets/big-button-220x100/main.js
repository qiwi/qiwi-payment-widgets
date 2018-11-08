import '../../modules/polyfill'
import Widget, {EWidgetsTypes} from '../../modules/widget';

import PaymentIcons from '../../components/PaymentIcons';
import Button from '../../components/Button';

import './css/styles.css';
import Desc from '../../components/Desc';
import Title from '../../components/Title';

const widgetPaymentIcons = PaymentIcons();
const widgetTitle = Title({showFromStart: false});
const widgetErrorDesc = Desc({showFromStart: false});
const widgetButton = Button();

const elements = [widgetTitle, widgetErrorDesc, widgetButton, widgetPaymentIcons];

const isTransparent = true;

const bigButton220x100 = new Widget(elements, EWidgetsTypes.BUTTON_WIDGET);

bigButton220x100.init();
