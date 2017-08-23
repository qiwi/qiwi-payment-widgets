import { getParametersValues, makeLinkCheckout} from '../../../utils';


var enterWidgetParams = ['public_key'];

var widgetParams = getParametersValues(enterWidgetParams);



var input = document.getElementById('donation-amount');

document.getElementById('make-donation').addEventListener('click', function() {

    var checkoutParams = {
        public_key: widgetParams['public_key'],
        amount: input.value
    };

    parent.location.href = makeLinkCheckout(checkoutParams);
});

input.addEventListener('input', function(e) {

    this.value = e.target.value.replace(/\D/g, '');

});
