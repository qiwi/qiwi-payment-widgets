import WidgetButton from '../widget-button';

export default class WidgetButtons extends WidgetButton {

    constructor() {

        super();

        this._propsToMethodMap = {
            title: this._makeTitle.bind(this),
            buttonsBlock: this._makeButtons.bind(this),
            link: this._makePartnerLink.bind(this),
            text: this._makeText.bind(this)
        };
    }

    _makeButtons() {

        const buttons = document.getElementsByClassName(this._elements.buttonsBlock.id);

        const public_key = this._merchantInfo.merchant_public_key;

        const sumAmount = this._merchantInfo.merchant_payment_sum_amount;

        const extra_widget_refferer = this._getHostName(document.referrer);

        const success_url = this._merchantInfo.merchant_success_url || '';

        const fail_url = this._merchantInfo.merchant_fail_url || '';

        [].forEach.call(buttons, (button, index) => {

            const param = `button${index + 1}`;

            let amount;

            if(sumAmount.length && sumAmount[index]) {

                amount = sumAmount[index];

                buttons[index].getElementsByTagName('span')[0].innerHTML= this._numberWithSpaces(amount);

            } else {
                amount = buttons[index].getElementsByTagName('span')[0].innerHTML;
            }


            if(public_key) {

                buttons[index].addEventListener('click', (e) => {

                    const checkoutParams = {
                        public_key,
                        amount,
                        success_url,
                        fail_url,
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