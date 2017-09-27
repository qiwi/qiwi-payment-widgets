import './css/styles.css';
import WidgetButton from '../../components/widget-button';

const smallWdiget300x180 = new WidgetButton(['public_key', 'button_name']);

smallWdiget300x180.init({
    button:{
        id: 'make-donation'
    },
    title: {
        id: 'merchant-title'
    }
});