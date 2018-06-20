import './style.css';
import {getTextColorByBackground, styleCode} from '../../modules/helpers';

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
        init: (data) => {
            component.changeText(data.merchant_widget_description);
            if (data.merchant_styles[styleCode.WIDGET_BACKGROUND]) {
                component.changeColor(data.merchant_styles[styleCode.WIDGET_BACKGROUND]);
            }
        },
        element: desc
    };

    return component;
}
