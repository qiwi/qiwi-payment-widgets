import './css/styles.css';
import WidgetButton from'../../components/widget-button';


const smallButton175x65 = new WidgetButton(['public_key', 'button_name']);

smallButton175x65.init({
    button:{
        id:'make-donation'
    }
});