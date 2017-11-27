import './css/styles.css';

import WidgetInput from '../../components/widget-input';

const middleWidget300x270 = new WidgetInput();

middleWidget300x270.init({
    button: {
        id: 'make-donation'
    },
    message: {
        id: 'error-message'
    },
    input: {
        id: 'donation-amount',
        errorState: 'widget__field--error'
    },
    link: {
        id: 'partner-link'
    }
});