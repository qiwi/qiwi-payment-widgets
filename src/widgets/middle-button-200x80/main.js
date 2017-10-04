import './css/styles.css';
import WidgetButton from'../../components/widget-button';


const middleButton200x80 = new WidgetButton(['public_key']);

middleButton200x80.init({
    button:{
        id:'make-donation'
    }
});