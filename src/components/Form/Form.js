import Field from '../Field';
import Button from '../Button';
import redirection from '../../modules/redirection';

import './style.css';

export default function Form (data) {
    let merchantInfo = data;

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

    button.addHandler(() => {
        redirection(fieldValue, merchantInfo);
    });

    button.disable();

    container.appendChild(field.element);
    container.appendChild(button.element);

    return {
        addMerchantInfo: (data) => {
            merchantInfo = data;

            button.changeText(data.merchant_button_text[0]);
        },
        disable: () => {
            button.disable();
            field.disable();
        },
        enable: () => {
            field.enable();
        },
        element: container
    };
}
