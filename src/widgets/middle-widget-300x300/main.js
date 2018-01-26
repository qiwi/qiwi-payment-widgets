import './css/styles.css';

import WidgetButton from '../../components/widget-button';

const middleWidget300x300 = new WidgetButton();

middleWidget300x300.init({
    button: {
        id: 'make-donation'
    },
    title: {
        id: 'merchant-title'
    },
    message: {
        id: 'error-message'
    },
    input: {
        id: 'donation-amount',
        errorState: 'widget__field--error',
        defaultValue: true
    },
    link: {
        id: 'partner-link'
    }
});
