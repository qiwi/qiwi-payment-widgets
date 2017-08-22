import {getParameterByName} from '../../../utils/getParameterByName.js';

/*var url = new URL(window.location.href);
var public_key = url.searchParams.get("public_key");*/


var public_key = getParameterByName('public_key');

console.log(getParameterByName('color'));

document.getElementById('make-donation').addEventListener('click', function() {

    var amount = document.getElementById('donation-amount').value;

    parent.location.href = 'https://oplata.qiwi.com/form/create?public_key=' + public_key + '&amount=' + amount;
});

document.getElementById('donation-amount').addEventListener('input', function(e) {

    this.value = e.target.value.replace(/\D/g, '');

});
