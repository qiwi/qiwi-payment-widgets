import './css/styles.css';
import WidgetButton from '../../components/widget-button';

const smallButton175x65 = new WidgetButton();

smallButton175x65.init({
    redirect: {
        id: 'make-donation'
    }
});
