import WidgetButton from '../widget-button';


export default class WidgetInput extends WidgetButton{

    constructor(enterWidgetParams) {

        super(enterWidgetParams);


    }

    init(elements) {
        this._elements = elements;

        this._makeInput();
        this._makeButton();

        if(this._elements.title) {
            this._getTitle();
        }

        if(this._elements.text) {
            this._makeText();
        }

    }

    _makeButton() {

        const button = document.getElementById(this._elements.button.id);

        const message = document.getElementById(this._elements.message.id);

        const input = document.getElementById(this._elements.input.id);

        if(this._widgetParams.button_name) {
            button.innerHTML = this._widgetParams.button_name;
        }


        button.addEventListener('click', () => {

            const checkoutParams = {
                public_key: this._widgetParams['public_key'],
                amount: input.value
            };

            const textErrorMessage = this._errorMessage(input.value);

            if(!textErrorMessage){

                parent.location.href = this._makeLinkCheckout(checkoutParams);

            } else {

                message.innerHTML = textErrorMessage;

                input.parentNode.classList.add(this._elements.input.errorState);
            }
        });
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

        return message;
    }

}