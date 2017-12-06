import './css/styles.css';

import WidgetInput from '../../components/widget-input';

const formInputPreorder = new WidgetInput();

formInputPreorder.init({
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
        errorState: 'widget__field--error'
    }/*,
    link: {
        id: 'partner-link'
    }*/
});