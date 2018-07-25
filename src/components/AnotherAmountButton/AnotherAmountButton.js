import Button from '../Button';
import {styleCode} from '../../modules/styles';

export default function AnotherAmountButton () {
    const anotherAmountButton = Button({classes: 'widget__button--inline kk', title: 'Другая сумма'});

    anotherAmountButton.init = (data) => {
        anotherAmountButton.text = 'Другая сумма';
        anotherAmountButton._changeText(anotherAmountButton.text);
        if (data.widgetStyles[styleCode.BUTTON_BACKGROUND]) {
            anotherAmountButton._changeBackgroundColor(data.widgetStyles[styleCode.BUTTON_BACKGROUND]);
        }
        anotherAmountButton.enable();
    };

    anotherAmountButton._changeText = (text = 'Другая сумма') => {
        anotherAmountButton.element.innerHTML = text;
    };

    anotherAmountButton.disable = () => {
        anotherAmountButton._changeText('Ошибка');
        anotherAmountButton.element.disabled = true;
    };

    anotherAmountButton.enable = () => {
        anotherAmountButton._changeText(anotherAmountButton.text);
        anotherAmountButton.element.disabled = false;
    };

    return anotherAmountButton;
}
