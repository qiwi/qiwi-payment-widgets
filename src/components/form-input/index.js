import 'url-search-params-polyfill';


export default class FormInput{

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
                    link: this._makePartnerLink.bind(this)
                };

                Object.keys(propsToMethodMap).forEach(key => {
                    if(elements[key]){
                        propsToMethodMap[key]();
                    }
                });

            } catch (err) {
                console.log(err);

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

     _makePartnerLink() {

        const public_key = this._merchantInfo.merchant_public_key;

        const parsedParams = new URLSearchParams({
            public_key
        });

        document.getElementById(this._elements.link.id).href = `https://widget.qiwi.com?${parsedParams.toString()}`;
    }

    _getMerchantInfo() {

        let url = 'https://my.qiwi.com/partners_api/merchant_widget_info';

        if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            url = 'http://s3705.qiwi.com/partners_api/merchant_widget_info';
        }

        let param = `merchant_public_key=${this._merchantId}`;


        if(this._merchantAlias && !this._merchantId) {
            param = `merchant_alias_code=${this._merchantAlias}`;
        }

        return fetch(`${url}?${param}`, {
                mode: 'cors'
            })
            .then(response => {

                if(response.status >= 400 ){

                    dataLayer.push({
                        'event': 'load.error',
                        'eventAction': 'Mechant name load error'
                    });

                    throw new Error('LoadError');
                }
                return response;

            })
            .then(response => response.json());
    }

    _getHostName (host='') {
        const a = document.createElement('a');
        a.href = host;
        return a.hostname;
    }


    _getAlias () {

        return window.location.pathname.match(/([^\/]*)\/*$/)[1];
    }

    _getParametersValues (enterWidgetParams) {

        let params = {};

        enterWidgetParams.forEach((param) => {
            params[param] = this._getParameterByName(param);
        });

        return params;
    }

    _getParameterByName (param, urlSearch = window.location.search) {
        const searchParams = new URLSearchParams(urlSearch);

        return searchParams.get(param);
    }


    _makeLinkCheckout (params) {

        const url = 'https://oplata.qiwi.com/form/create';
        const parsedParams = new URLSearchParams(params);

        return `${url}?${parsedParams.toString()}`;
    }

}