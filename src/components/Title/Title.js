import './style.css';
import {getContrastColorByBackground, styleCode} from '../../modules/helpers';

export default function Title () {
    const container = document.createElement('div');

    container.innerHTML = `<h1 class="widget__title" id="merchant-title">Наименование организации</h1>`;

    const title = container.firstChild;

    const component = {
        changeTitle: (newTitle = 'Наименование организации') => {
            title.innerHTML = newTitle;
        },
        changeColor: (backgroundColor) => {
            title.style.color = getContrastColorByBackground(backgroundColor);
        },
        showError: (newTitle = 'ОШИБКА!') => {
            title.innerHTML = newTitle;
            title.classList.add('widget__title--error');
        },
        element: title,
        init: (data) => {
            component.changeTitle(data.merchant_name);
            if (data.merchant_styles[styleCode.WIDGET_BACKGROUND]) {
                component.changeColor(data.merchant_styles[styleCode.WIDGET_BACKGROUND]);
            }
        },
        dispose: () => {
            component.showError();
        }
    };

    return component;
}
