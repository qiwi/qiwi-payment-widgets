import 'url-search-params-polyfill';


export default class WidgetButton {

    constructor(enterWidgetParams) {
        this._widgetParams = this._getParametersValues(enterWidgetParams);

        this._elements = {};
    }

    init(elements) {

        this._elements = elements;

        if(this._elements.button) {
            this._makeButton();
        }

        if(this._elements.title) {
            this._getTitle();
        }

        if(this._elements.text) {
            this._makeText();
        }

    }

    _getTitle() {

        const titleInfo = this._elements.title;

        const title = document.getElementById(titleInfo.id);

        this._getMerchant(this._widgetParams['public_key']).then((data) => {
            title.innerHTML = titleInfo.additional?`${titleInfo.additional} ${data['provider_name']}`:data['provider_name'];
        });

    }

    _makeText() {
        const text = document.getElementById(this._elements.text.id);

        text.innerHTML = '';

        if(this._widgetParams.text) {

            text.innerHTML = this._widgetParams.text;
        }
    }

    _makeButton() {

        const button = document.getElementById(this._elements.button.id);

        if(this._widgetParams['button_name']) {
            button.innerHTML = this._widgetParams['button_name'];
        }

        button.addEventListener('click', () => {

            const checkoutParams = {
                public_key: this._widgetParams['public_key']
            };

            parent.location.href = this._makeLinkCheckout(checkoutParams);
        });
    }

    _getMerchant(public_key) {

        let url = 'https://edge.qiwi.com/checkout/merchant/info';

        if(process.env.NODE_ENV === 'development') {
            url = '/proxy?url=https://edge.qiwi.com/checkout/merchant/info';
        }

        return fetch(`${url}?public_key=${public_key}`, {
                mode: 'cors'
            })
            .then(response => {

                if(response.status >= 400 && response.status < 500){
                    throw new Error('NotFoundError')
                }
                if(response.status >= 500) {
                    throw new Error('ServerError')
                }
                return response;

            })
            .then(response => response.json());
    }



    _getParametersValues (enterWidgetParams) {

        let params = {};

        enterWidgetParams.map((param) => {
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