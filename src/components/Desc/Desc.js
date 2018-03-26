import './style.css';

export default function Desc () {
    const desc = document.createElement('div');

    desc.className = 'widget__text';

    desc.innerHTML = ``;

    return {
        changeText: (text = '') => {
            desc.innerHTML = text;
        },
        element: desc
    };
}
