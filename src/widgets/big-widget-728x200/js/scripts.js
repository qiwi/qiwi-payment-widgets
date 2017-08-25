import { getParametersValues, makeLinkCheckout} from '../../../utils';


var enterWidgetParams = ['public_key', 'title', 'button_name', 'text'];

var widgetParams = getParametersValues(enterWidgetParams);


var input = document.getElementById('donation-amount');



var text = document.getElementById('text-donation');

text.innerHTML = widgetParams['text'] || '';


var title = document.getElementById('merchant-title');

title.innerHTML = 'Поддержите ' + widgetParams['title'];


var button = document.getElementById('make-donation');

button.innerHTML = widgetParams['button_name'] || 'Помочь сейчас';



button.addEventListener('click', function() {

    var checkoutParams = {
        public_key: widgetParams['public_key'],
        amount: input.value
    };

    parent.location.href = makeLinkCheckout(checkoutParams);
});

input.addEventListener('input', function(e) {

    this.value = e.target.value.replace(/\D/g, '');

});
