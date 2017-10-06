import WidgetButton from '../widget-button';


export default class WidgetInput extends WidgetButton{

    constructor(enterWidgetParams) {

        super(enterWidgetParams);


    }

    init(elements) {

        this._elements = elements;

        this._makeInput();
        this._makeButton();

        const propsToMethodMap = {
            title: this._getTitle.bind(this),
            text: this._makeText.bind(this),
            link: this._makePartnerLink.bind(this)
        };

        Object.keys(propsToMethodMap).forEach(key => {
            if(elements[key]){
                propsToMethodMap[key]();
            }
        });

    }

    _getTitle() {

        const self = this;

        const titleInfo = this._elements.title;

        const title = document.getElementById(titleInfo.id);

        this._getMerchantInfo(this._widgetParams['public_key'])
            .then((data) => {
                title.innerHTML = titleInfo.additional?`${titleInfo.additional} ${data['provider_name']}`:data['provider_name'];

                self._makeText();
            })
            .catch(() => {

            });

    }

    _makeButton() {

        const button = document.getElementById(this._elements.button.id);

        const message = document.getElementById(this._elements.message.id);

        const input = document.getElementById(this._elements.input.id);

        if(this._widgetParams.button_name) {
            button.innerHTML = this._widgetParams.button_name;
        }


        if(this._widgetParams['public_key']) {
            button.addEventListener('click', () => {



                const checkoutParams = {
                    public_key: this._widgetParams['public_key'],
                    amount: input.value,
                    extra_widget_refferer: window.location.hostname
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