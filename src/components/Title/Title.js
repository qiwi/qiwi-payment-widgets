import './style.css';

export default function Title () {
    const container = document.createElement('div');

    container.innerHTML = `<h1 class="widget__title" id="merchant-title">Наименование организации</h1>`;

    const title = container.firstChild;

    const component = {
        changeTitle: (newTitle = 'Наименование организации') => {
            title.innerHTML = newTitle;
        },
        showError: (newTitle = 'ОШИБКА!') => {
            title.innerHTML = newTitle;
            title.classList.add('widget__title--error');
        },
        element: title,
        onSuccess: (data) => {
            component.changeTitle(data.merchant_name);
        },
        onError: (data) => {
            component.showError();
        }
    };

    return component;
}
