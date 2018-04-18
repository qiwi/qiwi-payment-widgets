import './style.css';

export default function Desc () {
    const desc = document.createElement('div');

    desc.className = 'widget__text';

    desc.innerHTML = ``;

    const component = {
        changeText: (text = '') => {
            desc.innerHTML = text;
        },
        onSuccess: (data) => {
            component.changeText(data.merchant_widget_description);
        },
        element: desc
    };

    return component;
}
