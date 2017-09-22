import './css/styles.css';

import WidgetInput from '../../components/widget-input';

const middleWidget300x230 = new WidgetInput(['public_key', 'button_name']);

middleWidget300x230.init({
    button: {
        id: 'make-donation'
    },
    message: {
        id: 'error-message'
    },
    input: {
        id: 'donation-amount',
        errorState: 'widget__field--error'
    }
});