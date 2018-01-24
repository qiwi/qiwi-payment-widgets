import 'url-search-params-polyfill';

export default class WidgetButton {
    constructor() {
        this._propsToMethodMap = {
            title: this._makeTitle.bind(this),
            redirect: this._makeRedirect.bind(this),
            text: this._makeText.bind(this),
            link: this._makePartnerLink.bind(this),
            buttonsBlock: this._makeButtons.bind(this),
            triggerForm: this._makeTriggerForm.bind(this),
            button: this._makeButton.bind(this),
            input: this._makeInput.bind(this)
        };
    }

    async init(elements) {
        this._elements = elements;

        this._merchantId = this._getParameterByName('public_key');

        this._merchantAlias = this._getAlias();

        if (this._merchantId || this._merchantAlias) {
            try {
                const data = await this._getMerchantInfo();

                this._merchantInfo = data.result;

                const propsToMethodMap = this._propsToMethodMap;

                Object.keys(propsToMethodMap).forEach((key) => {
                    if (elements[key]) {
                        propsToMethodMap[key]();
                    }
                });

                this._changeTabTitle();
            } catch (err) {
                console.warn('Widget is disabled by: ', err);
            }
        }

        this._showBody();
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

    _makeRedirect() {
        const button = document.getElementById(this._elements.redirect.id);

        const buttonText = this._merchantInfo.merchant_button_text;

        if (buttonText.length) {
            button.innerHTML = buttonText[0];
        }

        const extra_widget_refferer = this._getHostName(document.referrer);

        const public_key = this._merchantInfo.merchant_public_key;

        const success_url = this._merchantInfo.merchant_success_url || '';

        const fail_url = this._merchantInfo.merchant_fail_url || '';

        if (public_key) {
            button.addEventListener('click', () => {
                const checkoutParams = {
                    public_key,
                    success_url,
                    fail_url,
                    extra_widget_refferer
                };

                window.open(this._makeLinkCheckout(checkoutParams), '_blank');
            });
        }
    }

    _makeButton() {
        const button = document.getElementById(this._elements.button.id);

        const message = document.getElementById(this._elements.message.id);

        const input = document.getElementById(this._elements.input.id);

        const buttonText = this._merchantInfo.merchant_button_text;

        if (buttonText.length) {
            button.innerHTML = buttonText[0];
        }

        const extra_widget_refferer = this._getHostName(document.referrer);

        const public_key = this._merchantInfo.merchant_public_key;

        const success_url = this._merchantInfo.merchant_success_url || '';

        const fail_url = this._merchantInfo.merchant_fail_url || '';

        if (public_key) {
            button.addEventListener('click', () => {
                const checkoutParams = {
                    public_key,
                    amount: input.value,
                    success_url,
                    fail_url,
                    extra_widget_refferer
                };

                const textErrorMessage = this._errorMessage(input.value);

                if (!textErrorMessage) {
                    window.open(
                        this._makeLinkCheckout(checkoutParams),
                        '_blank'
                    );
                } else {
                    message.innerHTML = textErrorMessage;

                    input.parentNode.classList.add(
                        this._elements.input.errorState
                    );
                }
            });
        }
    }

    _makeInput() {
        const input = document.getElementById(this._elements.input.id);
        if (
            this._merchantInfo.merchant_payment_sum_amount[0] &&
            this._elements.input.defaultValue
        ) {
            input.value = this._merchantInfo.merchant_payment_sum_amount[0];
        }

        input.addEventListener('input', (e) => {
            input.parentNode.classList.remove(this._elements.input.errorState);

            let number = e.target.value
                .replace(/[^0-9,.]/g, '')
                .substring(0, 9);

            input.value = number ? parseFloat(number, 10) : number;
        });
    }

    _errorMessage(value) {
        let message = '';

        if (!/^[0-9]{1,6}([,.][0-9]{1,2})?$/.test(value)) {
            message = 'Некорректная сумма';
        }
        if (!value) {
            message = 'Введите сумму';
        }
        if (parseFloat(value) < 1) {
            message = 'Минимальная сумма 1 ₽';
        }
        if (parseFloat(value) > 500000) {
            message = 'Максимальная сумма 500 000 ₽';
        }
        if (message) {
            dataLayer.push({
                event: 'validation.error',
                eventAction: message
            });
        }

        return message;
    }

    _makeButtons() {
        const buttons = document.getElementsByClassName(
            this._elements.buttonsBlock.class
        );

        const public_key = this._merchantInfo.merchant_public_key;

        const sumAmount = this._merchantInfo.merchant_payment_sum_amount;

        const extra_widget_refferer = this._getHostName(document.referrer);

        const success_url = this._merchantInfo.merchant_success_url || '';

        const fail_url = this._merchantInfo.merchant_fail_url || '';

        [].forEach.call(buttons, (button, index) => {
            const param = `button${index + 1}`;

            let amount;

            if (sumAmount.length && sumAmount[index]) {
                amount = sumAmount[index];

                buttons[index].getElementsByTagName(
                    'span'
                )[0].innerHTML = this._numberWithSpaces(amount);
            } else {
                amount = buttons[index].getElementsByTagName('span')[0]
                    .innerHTML;
            }

            if (public_key) {
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

    _makeTriggerForm() {
        const trigger = document.getElementById(this._elements.triggerForm.id);
        const formFrom = document.getElementById(
            this._elements.triggerForm.forms.from
        );

        const formTo = document.getElementById(
            this._elements.triggerForm.forms.to
        );

        trigger.addEventListener('click', () => {
            formFrom.classList.toggle('hidden');
            formTo.classList.toggle('hidden');
        });
    }

    _makePartnerLink() {
        const public_key = this._merchantInfo.merchant_public_key;

        const parsedParams = new URLSearchParams({
            public_key
        });

        document.getElementById(
            this._elements.link.id
        ).href = `https://widget.qiwi.com?${parsedParams.toString()}`;
    }

    _getMerchantInfo() {
        let url = 'https://my.qiwi.com/partners_api/merchant_widget_info';

        if (
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            url = 'http://s3705.qiwi.com/partners_api/merchant_widget_info';
        }

        let param = `merchant_public_key=${this._merchantId}`;

        if (this._merchantAlias && !this._merchantId) {
            param = `merchant_alias_code=${this._merchantAlias}`;
        }

        return fetch(`${url}?${param}`, {
            mode: 'cors'
        })
            .then((response) => {
                if (response.status >= 400) {
                    dataLayer.push({
                        event: 'load.error',
                        eventAction: 'Mechant name load error'
                    });

                    throw new Error('LoadError');
                }
                return response;
            })
            .then((response) => response.json());
    }

    _getHostName(host = '') {
        const a = document.createElement('a');
        a.href = host;

        return encodeURIComponent(a.hostname.replace(/\./g, '-'));
    }

    _getAlias() {
        return window.location.pathname.match(/([^\/]*)\/*$/)[1];
    }

    _getParametersValues(enterWidgetParams) {
        let params = {};

        enterWidgetParams.forEach((param) => {
            params[param] = this._getParameterByName(param);
        });

        return params;
    }

    _getParameterByName(param, urlSearch = window.location.search) {
        const searchParams = new URLSearchParams(urlSearch);

        return searchParams.get(param);
    }

    _makeLinkCheckout(params) {
        const url = 'https://oplata.qiwi.com/create';
        const parsedParams = new URLSearchParams(params);

        return `${url}?${parsedParams.toString()}`;
    }

    _numberWithSpaces(x) {
        let parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    }
}
