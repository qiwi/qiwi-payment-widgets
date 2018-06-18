import './style.css';
import {getTextColorByBackground} from '../../modules/helpers';

export default function Title () {
    const container = document.createElement('div');

    container.innerHTML = `<h1 class="widget__title" id="merchant-title">Наименование организации</h1>`;

    const title = container.firstChild;

    const component = {
        changeTitle: (newTitle = 'Наименование организации') => {
            title.innerHTML = newTitle;
        },
        changeColor: (backgroundColor) => {
            title.style.color = getTextColorByBackground(backgroundColor);
        },
        showError: (newTitle = 'ОШИБКА!') => {
            title.innerHTML = newTitle;
            title.classList.add('widget__title--error');
        },
        element: title,
        onSuccess: (data) => {
            component.changeTitle(data.merchant_name);
            if (data.merchant_widget_background) {
                component.changeColor(data.merchant_widget_background);
            }
        },
        onError: (data) => {
            component.showError();
        }
    };

    return component;
}
