import 'url-search-params-polyfill';


export default class WidgetButton {

    constructor() {
        this._propsToMethodMap = {
            title: this._makeTitle.bind(this),
            button: this._makeButton.bind(this),
            text: this._makeText.bind(this)
        };
    }

    async init(elements) {

        this._elements = elements;

        this._merchantId = this._getParameterByName('public_key');

        if(this._merchantId) {

            try {

                const data = await this._getMerchantInfo();

                this._merchantInfo = data.result;

                const propsToMethodMap = this._propsToMethodMap;

                Object.keys(propsToMethodMap).forEach(key => {
                    if(elements[key]){
                        propsToMethodMap[key]();
                    }
                });

            } catch (err) {

                console.warn('Widget is disabled by: ',err);
            }
        }

        this._showBody();

        this._changeTabTitle();
    }

    _showBody() {
        document.body.style.opacity = '1';
    }

    _changeTabTitle() {
        document.title = this._merchantInfo.merchant_name;
    }


    _makeTitle() {

        const title = document.getElementById(this._elements.title.id);

        title.innerHTML = this._merchantInfo.merchant_name;

    }

    _makeText() {
        const desc = document.getElementById(this._elements.text.id);

        desc.innerHTML = this._merchantInfo.merchant_widget_description;
    }

    _makeButton() {

        const button = document.getElementById(this._elements.button.id);

        const buttonText = this._merchantInfo.merchant_button_text;

        if(buttonText.length) {

            button.innerHTML = buttonText[0];
        }


        const extra_widget_refferer = this._getHostName(document.referrer);

        const public_key = this._merchantInfo.merchant_public_key;

        const success_url = this._merchantInfo.merchant_success_url_optional;

        const fail_url = this._merchantInfo.merchant_fail_url_optional;


        if(public_key) {

            button.addEventListener('click', () => {

                const checkoutParams = {
                    public_key,
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

        return encodeURIComponent(a.hostname.replace(/\./g, '-'));
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