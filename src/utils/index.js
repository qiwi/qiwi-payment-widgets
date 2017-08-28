import 'url-search-params-polyfill';

export function getParameterByName(param, urlSearch) {
    var searchParams = new URLSearchParams(urlSearch || window.location.search);

    return searchParams.get(param);
}


export function getParametersValues (enterWidgetParams) {

    var params = {};

    enterWidgetParams.map(function(param) {
        params[param] = getParameterByName(param);
    });

    return params;
}

export function makeLinkCheckout (params) {

    var url = 'https://oplata.qiwi.com/form/create';
    var parsedParams = new URLSearchParams(params);

    return url + '?' + parsedParams.toString();
}

export function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

export function errorMessage(value) {

    var message = '';

    if( /^[0-9]{1,6}([,.][0-9]{1,2})?$/.test(value)){
        message = 'Cумма введена не корректно';
    }
    if(!value){
        message = 'Введите сумму';
    }
    if(parseFloat(value)>300000){
        message = 'Cумма превышает 300000р.';
    }

    return message;
}