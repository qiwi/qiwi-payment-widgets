import './style.css';
import {getContrastColorByBackground} from '../../modules/helpers';
import {color, styleCode} from '../../modules/styles';

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
        showError: (newTitle = 'Ошибка загрузки информации о партнере') => {
            title.innerHTML = newTitle;
            title.classList.add('widget__title--error');
        },
        element: title,
        init: (data) => {
            component.changeTitle(data.widgetMerchantName);
            const bgColor = data.widgetStyles[styleCode.WIDGET_BACKGROUND] || color.WHITE;
            component.changeColor(bgColor);
        },
        dispose: () => {
            component.showError();
        }
    };

    return component;
}
