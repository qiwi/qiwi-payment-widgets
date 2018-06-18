import Field from '../Field';
import Button from '../Button';
import redirection from '../../modules/redirection';

import './style.css';

export default function Form ({
    data = {},
    redirectionHandler = redirection
} = {}) {
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

    button.addHandler(() => redirectionHandler(fieldValue, merchantInfo));

    container.appendChild(field.element);
    container.appendChild(button.element);

    const component = {
        addMerchantInfo: (data) => {
            merchantInfo = data;

            button.changeText(data.merchant_button_text[0]);
            if (data.merchant_button_background) {
                button.changeBackgroundColor(data.merchant_button_background);
            }
        },
        disable: () => {
            button.disable();
            field.disable();
        },
        enable: () => {
            field.enable();
        },
        onSuccess: (data) => {
            component.addMerchantInfo(data);

            component.enable();
        },
        onError: (data) => {
            component.disable();
        },
        element: container
    };

    return component;
}
