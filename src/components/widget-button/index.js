import {getParametersValues, makeLinkCheckout} from '../../utils';

var enterWidgetParams = ['public_key', 'button_name'];

var widgetParams = getParametersValues(enterWidgetParams);

var button = document.getElementById('make-donation');

button.innerHTML = widgetParams['button_name'] || 'Оплатить';

button.addEventListener('click', function() {

    var checkoutParams = {
        public_key: widgetParams['public_key']
    };

    parent.location.href = makeLinkCheckout(checkoutParams);
});