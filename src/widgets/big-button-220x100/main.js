import './css/styles.css';
import WidgetButton from '../../components/widget-button';

const bigButton220x210 = new WidgetButton();

bigButton220x210.init({
    redirect: {
        id: 'make-donation'
    }
});
