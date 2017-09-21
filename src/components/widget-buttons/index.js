import WidgetButton from '../widget-button';

export default class WidgetButtons extends WidgetButton {


    constructor(enterWidgetParams) {

        super(enterWidgetParams);
    }

    init(elements) {
        this._elements = elements;

        this._makeButton();

        if(this._elements.buttonsBlock) {
            this._makeButtons();
        }

        if(this._elements.title) {
            this._getTitle();
        }

        if(this._elements.text) {
            this._makeText();
        }

        if(this._elements.link) {
            this._makePartnerLink();
        }
    }

    _makeButtons() {

        const buttons = document.getElementsByClassName(this._elements.buttonsBlock.id);

        [].forEach.call(buttons, (button, index) => {

            const param = `button${index + 1}`;

            let amount = this._widgetParams[param];

            if(amount) {
                buttons[index].getElementsByTagName('span')[0].innerHTML= this._numberWithSpaces(amount);
            } else {
                amount = buttons[index].getElementsByTagName('span')[0].innerHTML;
            }

            buttons[index].addEventListener('click', (e) => {

                const checkoutParams = {
                    public_key: this._widgetParams['public_key'],
                    amount: amount
                };

                parent.location.href = this._makeLinkCheckout(checkoutParams);
            });

        });
    }

    _numberWithSpaces(x) {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }
}