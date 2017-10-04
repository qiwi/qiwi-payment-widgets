import './css/styles.css';
import WidgetInput from '../../components/widget-input';

const bigWidget728x200 = new WidgetInput(['public_key']);

bigWidget728x200.init({
    button: {
        id: 'make-donation'
    },
    title: {
        id: 'merchant-title',
        additional: 'Поддержите'
    },
    text: {
        id: 'text-donation'
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