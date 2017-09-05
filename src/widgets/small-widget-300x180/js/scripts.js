import {getParametersValues, makeLinkCheckout, getMerchant} from '../../utils';

var enterWidgetParams = ['public_key', 'button_name', 'title'];

var widgetParams = getParametersValues(enterWidgetParams);



var button = document.getElementById('make-donation');

button.innerHTML = widgetParams['button_name'] || 'Оплатить';


var input = document.getElementById('merchant-title');

/*input.innerHTML = widgetParams['title'] || '';*/



button.addEventListener('click', function() {

    var checkoutParams = {
        public_key: widgetParams['public_key']
    };

    parent.location.href = makeLinkCheckout(checkoutParams);
});