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
