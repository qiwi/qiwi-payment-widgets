import WidgetButton from '../widget-button';


export default class WidgetInput extends WidgetButton{

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
                    button: this._makeButton.bind(this),
                    link: this._makePartnerLink.bind(this),
                    input: this._makeInput.bind(this)
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


    _makeTitle() {

        const title = document.getElementById(this._elements.title.id);

        title.innerHTML = this._merchantInfo.merchant_name;

    }


    _makeButton() {

        const button = document.getElementById(this._elements.button.id);

        const message = document.getElementById(this._elements.message.id);

        const input = document.getElementById(this._elements.input.id);


        const extra_widget_refferer = this._getHostName(document.referrer);

        const public_key = this._merchantInfo.merchant_public_key;

        if(public_key) {

            button.addEventListener('click', () => {

                const checkoutParams = {
                    public_key,
                    amount: input.value,
                    extra_widget_refferer
                };

                const textErrorMessage = this._errorMessage(input.value);

                if(!textErrorMessage){

                    window.open(
                        this._makeLinkCheckout(checkoutParams),
                        '_blank'
                    );

                } else {

                    message.innerHTML = textErrorMessage;

                    input.parentNode.classList.add(this._elements.input.errorState);
                }
            });
        }
    }


    _makeInput() {
        const input = document.getElementById(this._elements.input.id);

        input.addEventListener('input', (e) => {

            input.parentNode.classList.remove(this._elements.input.errorState);

            input.value = e.target.value.replace(/[^0-9.,]/g, '').substring(0,9);


        });
    }

    _errorMessage(value) {

        let message = '';

        if(!/^[0-9]{1,6}([,.][0-9]{1,2})?$/.test(value)){
            message = 'Некорректная сумма';
        }
        if(!value){
            message = 'Введите сумму';
        }
        if(parseFloat(value)>500000){
            message = 'Максимальная сумма 500 000 ₽';
        }
        if(message) {
            dataLayer.push({
                'event': 'validation.error',
                'eventAction': message
            });
        }

        return message;
    }

}