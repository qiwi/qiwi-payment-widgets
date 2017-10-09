import WidgetButton from '../widget-button';

export default class WidgetButtons extends WidgetButton {


    constructor(enterWidgetParams) {

        super(enterWidgetParams);
    }

    init(elements) {

        this._elements = elements;

        this._makeButton();

        const propsToMethodMap = {
            buttonsBlock: this._makeButtons.bind(this),
            title: this._getTitle.bind(this),
            link: this._makePartnerLink.bind(this)
        };

        Object.keys(propsToMethodMap).forEach(key => {
            if(elements[key]){
                propsToMethodMap[key]();
            }
        });
    }

    _makeButtons() {

        const buttons = document.getElementsByClassName(this._elements.buttonsBlock.id);

        const public_key = this._widgetParams['public_key'];

        const extra_widget_refferer = this._getHostName(document.referrer);

        [].forEach.call(buttons, (button, index) => {

            const param = `button${index + 1}`;

            let amount = this._widgetParams[param];

            if(amount) {
                buttons[index].getElementsByTagName('span')[0].innerHTML= this._numberWithSpaces(amount);
            } else {
                amount = buttons[index].getElementsByTagName('span')[0].innerHTML;
            }


            if(public_key) {

                buttons[index].addEventListener('click', (e) => {

                    const checkoutParams = {
                        public_key,
                        amount,
                        extra_widget_refferer
                    };

                    window.open(
                        this._makeLinkCheckout(checkoutParams),
                        '_blank'
                    );
                });
            }

        });
    }

    _numberWithSpaces(x) {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }
}