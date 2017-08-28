import { getParametersValues, makeLinkCheckout, errorMessage} from '../../../utils';


var enterWidgetParams = ['public_key', 'title', 'button_name', 'text'];

var widgetParams = getParametersValues(enterWidgetParams);


var input = document.getElementById('donation-amount');



var text = document.getElementById('text-donation');

text.innerHTML = widgetParams['text'] || '';


var title = document.getElementById('merchant-title');

title.innerHTML = 'Поддержите ' + widgetParams['title'];


var button = document.getElementById('make-donation');

button.innerHTML = widgetParams['button_name'] || 'Помочь сейчас';


var message = document.getElementById('error-message');


button.addEventListener('click', function() {

    var checkoutParams = {
        public_key: widgetParams['public_key'],
        amount: input.value
    };

    var textErrorMessage = errorMessage(input.value);

    if(!textErrorMessage){

        parent.location.href = makeLinkCheckout(checkoutParams);

    } else {

        message.innerHTML = textErrorMessage;

        input.parentNode.classList.add('widget__field--error');
    }
});

input.addEventListener('input', function(e) {


    input.parentNode.classList.remove('widget__field--error');
    this.value = e.target.value.replace(/[^0-9.,]/g, '');

});
