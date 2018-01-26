import './css/styles.css';

import WidgetButton from '../../components/widget-button';

const bigWidgetButtons728x200 = new WidgetButton();

bigWidgetButtons728x200.init({
    redirect: {
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
        class: 'set-amount'
    },
    link: {
        id: 'partner-link'
    }
});
