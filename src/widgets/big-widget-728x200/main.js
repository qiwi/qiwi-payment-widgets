import Widget from '../../modules/widget';

import Title from '../../components/Title';
import PaymentIcons from '../../components/PaymentIcons';
import Desc from '../../components/Desc';
import Logo from '../../components/Logo';
import Forms from '../../components/Forms';
import Form from '../../components/Form';
import AnotherAmountButton from '../../components/AnotherAmountButton';
import Variants from '../../components/Variants';
import Block from '../../components/Block';
import Oferta from '../../components/Oferta';

import './css/styles.css';

let defaultVariants = [100, 500];

const widgetTitle = Title();
const widgetPaymentIcons = PaymentIcons();
const widgetDesc = Desc();
const widgetImage = Logo();
const widgetOferta = Oferta();
const widgetFormTrigger = AnotherAmountButton();
const widgetFooter = Block([widgetPaymentIcons, widgetOferta], 'widget__footer');

const widgetVariants = Variants({ defaultVariants });

const widgetForm = Form();

const widgetForms = Forms([
    {
        form: widgetVariants,
        triggerToNext: widgetFormTrigger
    },
    {
        form: widgetForm
    }
]);

const widgetBlock = Block([widgetTitle, widgetDesc, widgetForms, widgetFooter], 'widget__main');
const widgetContainer = Block([widgetImage, widgetBlock], 'widget--row');

const elements = [widgetContainer];

const bigWidget728x200 = new Widget(elements);

bigWidget728x200.init();
