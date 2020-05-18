import {getHostName} from './parsers';
import {formatURLFromReferrer} from './helpers'
import config from '../config/default';

function makeLinkCheckout (params, extras) {
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
        widgetSuccessUrl,
        widgetFailUrl,
        merchantSitePublicKey,
        widgetAliasCode,
        themeCode,
        widgetDescription
    }
) {
    const publicKey = merchantSitePublicKey;

    const successUrl = widgetSuccessUrl || '';

    const failUrl = widgetFailUrl || '';
    const comment = widgetDescription;

    const widgetAlias = widgetAliasCode.toLowerCase() || '';
    const widgetReferrer = formatURLFromReferrer(getHostName(document.referrer));

    if (publicKey) {
        const checkoutParams = {
            publicKey,
            amount,
            successUrl,
            failUrl,
            comment
        };
        const extras = {
            widgetAlias,
            widgetReferrer,
            themeCode
        };
        let link = makeLinkCheckout(checkoutParams, extras);

        window.open(link, '_blank');
    }
}
