import './css/styles.css';
import WidgetButton from '../../components/widget-button';

const smallWdiget300x200 = new WidgetButton();

smallWdiget300x200.init({
    redirect: {
        id: 'make-donation'
    },
    title: {
        id: 'merchant-title'
    },
    link: {
        id: 'partner-link'
    }
});
