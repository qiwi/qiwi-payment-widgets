import './css/styles.css';

import WidgetButton from '../../components/widget-button';

const bigWidgetButtons728x200 = new WidgetButton();

bigWidgetButtons728x200.init({
    button: {
        id: 'make-donation'
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
    },
    message: {
        id: 'error-message'
    },
    input: {
        id: 'donation-amount',
        errorState: 'widget__field--error',
        defaultValue: false
    },
    triggerForm: {
        id: 'trigger-form',
        forms: {
            from: 'make-donation-block',
            to: 'make-donation-input'
        }
    }
});
