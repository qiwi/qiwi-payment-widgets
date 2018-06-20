import Button from '../Button';

export default function AnotherAmountButton () {
    const anotherAmountButton = Button({classes: 'widget__button--inline'});
    anotherAmountButton._changeText = () => {
        anotherAmountButton.element.innerHTML = 'Другая сумма';
    };
    return anotherAmountButton;
}
