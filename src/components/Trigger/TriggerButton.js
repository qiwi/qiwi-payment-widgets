import Button from '../Button';

export default function TriggerButton () {
    const triggerButton = Button({classes: 'widget__button--inline'});
    triggerButton._changeText = () => {
        triggerButton.element.innerHTML = 'Другая сумма';
    };
    return triggerButton;
}