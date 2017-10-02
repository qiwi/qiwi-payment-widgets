import './css/styles.css';


import WidgetButtons from '../../components/widget-buttons';

const bigWidgetButtons728x200 = new WidgetButtons(['public_key', 'text', 'button1', 'button2', 'button3']);

bigWidgetButtons728x200.init({
    button: {
        id: 'another-amount'
    },
    title: {
        id: 'merchant-title',
        additional: ''
    },
    text: {
        id: 'text-donation'
    },
    buttonsBlock: {
        id: 'set-amount'
    },
    link: {
        id: 'partner-link'
    }
});
