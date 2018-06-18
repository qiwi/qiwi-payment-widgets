import './style.css';
import {getTextColorByBackground} from '../../modules/helpers';

export default function Desc () {
    const desc = document.createElement('div');

    desc.className = 'widget__text';

    desc.innerHTML = ``;

    const component = {
        changeText: (text = '') => {
            desc.innerHTML = text;
        },
        changeColor: (backgroundColor) => {
            desc.style.color = getTextColorByBackground(backgroundColor);
        },
        onSuccess: (data) => {
            component.changeText(data.merchant_widget_description);
            if (data.merchant_widget_background) {
                component.changeColor(data.merchant_widget_background);
            }
        },
        element: desc
    };

    return component;
}
