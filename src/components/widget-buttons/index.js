import WidgetButton from '../widget-button';

export default class WidgetButtons extends WidgetButton {

    async init(elements) {

        this._elements = elements;

        this._merchantId = this._getParameterByName('public_key');

        this._merchantAlias = this._getAlias();

        if(this._merchantId || this._merchantAlias) {

            try {

                const data = await this._getMerchantInfo();

                this._merchantInfo = data.result;

                const propsToMethodMap = {
                    title: this._makeTitle.bind(this),
                    buttonBlock: this._makeButtons.bind(this),
                    link: this._makePartnerLink.bind(this)
                };

                Object.keys(propsToMethodMap).forEach(key => {
                    if(elements[key]){
                        propsToMethodMap[key]();
                    }
                });

            } catch (err) {
                console.warn(err);

            }
        }

    }

    _makeButtons() {

        const buttons = document.getElementsByClassName(this._elements.buttonsBlock.id);

        const public_key = this._merchantInfo.merchant_public_key;

        const merchant_payment_sum_amount = this._merchantInfo.merchant_payment_sum_amount;

        const extra_widget_refferer = this._getHostName(document.referrer);

        [].forEach.call(buttons, (button, index) => {

            const param = `button${index + 1}`;

            let amount = merchant_payment_sum_amount[index];

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