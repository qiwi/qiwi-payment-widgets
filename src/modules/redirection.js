import {getHostName} from './parsers';
import config from '../config/default';

function makeLinkCheckout(params, extras) {
    const url = 'https://oplata.qiwi.com/create';
    const parsedParams = new URLSearchParams(params);
    Object.getOwnPropertyNames(extras).forEach(extraName => {
        parsedParams.append(`extras[${extraName}]`, `${extras[extraName]}`);
    });

    return `${url}?${parsedParams.toString()}`;
}

export function preorderRedirection (widgetAliasCode) {
    window.open(`${config.preorderUrl}/${widgetAliasCode}?widgetReferrer=` + getHostName(document.referrer), '_blank');
}

export function checkoutRedirection (
    amount = 0,
    {
        widget_success_url,
        widgetFailUrl,
        merchantSitePublicKey,
        widgetAliasCode
    }
) {
    const publicKey = merchantSitePublicKey;

    const successUrl = widget_success_url || '';

    const failUrl = widgetFailUrl || '';

    const widgetAlias = widgetAliasCode || '';

    const widgetRefferer = getHostName(document.referrer);

    if (publicKey) {
        const checkoutParams = {
            publicKey,
            amount,
            successUrl,
            failUrl
        };


        const extras = {
            widgetAlias,
            widgetRefferer
        };


        let link = makeLinkCheckout(checkoutParams, extras);

        window.open(link, '_blank');
    }
}
