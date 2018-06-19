import Field from '../Field';
import Button from '../Button';
import redirection from '../../modules/redirection';

import './style.css';

export default function Form () {
    let merchantInfo = {};
    let fieldValue = '';

    const container = document.createElement('div');

    container.className = 'widget__form';

    const button = Button();

    const changeFieldValue = (newFieldValue, error) => {
        if (error) {
            button.disable();
        } else {
            button.enable();
        }
        fieldValue = newFieldValue;
    };

    const field = Field(changeFieldValue);

    button.setClickHandler(() => {
        redirection(fieldValue, merchantInfo)
    });

    container.appendChild(field.element);
    container.appendChild(button.element);

    const component = {
        _addMerchantInfo: (data) => {
            merchantInfo = data;
        },
        disable: () => {
            button.disable();
            field.disable();
        },
        enable: () => {
            field.enable();
        },
        init: (data) => {
            component._addMerchantInfo(data);
            button.init(data);
            component.enable();
        },
        dispose: (data) => {
            component.disable();
        },
        element: container
    };

    return component;
}
