import '../../modules/polyfill'
import Widget, {EWidgetsTypes} from '../../modules/widget';

import Title from '../../components/Title';
import PaymentIcons from '../../components/PaymentIcons';
import Desc from '../../components/Desc';
import Logo from '../../components/Logo';
import Link from '../../components/Link'
import Forms from '../../components/Forms';
import Form from '../../components/Form';
import AnotherAmountButton from '../../components/AnotherAmountButton';
import Variants from '../../components/Variants';
import Block from '../../components/Block';
import Oferta from '../../components/Oferta';

import './css/styles.css';
import {styleCode} from '../../modules/styles'

const widgetTitle = Title();
const widgetPaymentIcons = PaymentIcons();
const widgetDesc = Desc();
const widgetLogo = Logo();
const widgetLink = Link();
const widgetOferta = Oferta();
const widgetFormTrigger = AnotherAmountButton();
const widgetFooter = Block([widgetPaymentIcons, widgetOferta], 'widget__footer');

const widgetSumVariants = Variants();

const widgetForm = Form();

const widgetForms = Forms([
    {
        condition: (styles) => !styles[styleCode.FIXED_AMOUNT],
        form: widgetSumVariants,
        triggerToNext: widgetFormTrigger
    },
    {
        form: widgetForm
    }
]);

const widgetMainBlock = Block([widgetTitle, widgetDesc, widgetForms, widgetFooter], 'widget__main-block');
const widgetLogoBlock = Block([widgetLogo, widgetLink], 'widget__image-block');
widgetLogoBlock.disposeChildren = widgetLogoBlock.dispose;
widgetLogoBlock.dispose = (data) => {
    widgetLogoBlock.disposeChildren();
    widgetLogoBlock.element.style.display = 'none';
};

const widgetContainer = Block([widgetLogoBlock, widgetMainBlock], 'widget--row');

const elements = [widgetContainer];

const bigWidget728x200 = new Widget(elements, EWidgetsTypes.BIG_WIDGET);

bigWidget728x200.init();
