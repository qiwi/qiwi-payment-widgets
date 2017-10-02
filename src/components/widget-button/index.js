import 'url-search-params-polyfill';


export default class WidgetButton {

    constructor(enterWidgetParams) {
        this._widgetParams = this._getParametersValues(enterWidgetParams);

        this._elements = {};
    }

    init(elements) {

        this._elements = elements;

        const propsToMethodMap = {
            button: this._makeButton.bind(this),
            title: this._getTitle.bind(this),
            text: this._makeText.bind(this)
        };

        Object.keys(propsToMethodMap).forEach(key => {
            if(elements[key]){
                propsToMethodMap[key]();
            }
        });
    }

    _getTitle() {

        const titleInfo = this._elements.title;

        const title = document.getElementById(titleInfo.id);

        this._getMerchant(this._widgetParams['public_key'])
            .then((data) => {
                title.innerHTML = titleInfo.additional?`${titleInfo.additional} ${data['provider_name']}`:data['provider_name'];
            })
            .catch(() => {

            });

    }

    _makeText() {
        const text = document.getElementById(this._elements.text.id);

        if(this._widgetParams.text) {

            text.innerHTML = this._widgetParams.text;
        }
    }

    _makeButton() {

        const button = document.getElementById(this._elements.button.id);

        if(this._widgetParams['button_name']) {
            button.innerHTML = this._widgetParams['button_name'];
        }

        if(this._widgetParams['public_key']) {

            button.addEventListener('click', () => {

                    const checkoutParams = {
                        public_key: this._widgetParams['public_key']
                    };

                    window.open(
                        this._makeLinkCheckout(checkoutParams),
                        '_blank'
                    );
            });
        }
    }


    _makePartnerLink() {

        const parsedParams = new URLSearchParams({
            public_key: this._widgetParams['public_key']
        });

        document.getElementById(this._elements.link.id).href = `https://widget.qiwi.com?${parsedParams.toString()}`;
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