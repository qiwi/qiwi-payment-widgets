import { getParametersValues, makeLinkCheckout, errorMessage, getMerchant} from '../../../utils';


var enterWidgetParams = ['public_key', 'title', 'button_name'];

var widgetParams = getParametersValues(enterWidgetParams);

var input = document.getElementById('donation-amount');


var title = document.getElementById('merchant-title');

getMerchant(widgetParams['public_key']).then(function(data) {
    title.innerHTML = data['provider_name'];
});


/*title.innerHTML = widgetParams['title'] || 'Фонд помощи';*/


var button = document.getElementById('make-donation');

/*button.innerHTML = widgetParams['button_name'] || 'Помочь сейчас';*/

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
    this.value = e.target.value.replace(/[^0-9.,]/g, '').substring(0,9);


});
