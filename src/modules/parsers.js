/* global URLSearchParams */
import 'url-search-params-polyfill';

export function getHostName (url = '') {
    if (!url.length) {
        return url;
    }

    let hostname = url
        .split('//')[1]
        .split('/')[0]
        .split(':')[0];

    return encodeURIComponent(hostname.replace(/\./g, '-'));
}

export function getAlias () {
    return getParameterByName('alias');
}

export function getPublicKey () {
    return getParameterByName('publicKey') || getParameterByName('public_key'); // legacy public_key
}

export function getNoCacheFlag () {
    return getParameterByName('noCache');
}

export function numberWithSpaces (number) {
    let parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

function getParametersValues (enterWidgetParams) {
    let params = {};

    enterWidgetParams.forEach((param) => {
        params[param] = getParameterByName(param);
    });

    return params;
}

function getParameterByName (param, urlSearch = window.location.search) {
    const searchParams = new URLSearchParams(urlSearch);
    if(param === 'alias'){
        let searchParamsAlias = searchParams.get(param);
        searchParamsAlias = searchParamsAlias.toLowerCase();
        return searchParamsAlias;
    }
    return searchParams.get(param);
}
