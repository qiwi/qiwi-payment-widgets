import './css/styles.css';
import WidgetButton from '../../components/widget-button';

const middleButton200x80 = new WidgetButton();

middleButton200x80.init({
    redirect: {
        id: 'make-donation'
    }
});
