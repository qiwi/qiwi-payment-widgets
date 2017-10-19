import './css/styles.css';

import FormInput from '../../components/form-input';

const formInputPreorder = new FormInput();

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
    },
    link: {
        id: 'partner-link'
    }
});