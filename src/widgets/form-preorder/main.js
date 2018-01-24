import './css/styles.css';

import WidgetButton from '../../components/widget-button';

const formInputPreorder = new WidgetButton();

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
        errorState: 'widget__field--error',
        defaultValue: true
    } /*,
    link: {
        id: 'partner-link'
    }*/
});
