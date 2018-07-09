import {getHostName} from './parsers';

function makeLinkCheckout(params, extras) {
    const url = 'https://oplata.qiwi.com/create';
    const parsedParams = new URLSearchParams(params);
    Object.getOwnPropertyNames(extras).forEach(extraName => {
        parsedParams.append(`extras[${extraName}]`, `${extras[extraName]}`);
    });

    return `${url}?${parsedParams.toString()}`;
}

export default function redirection(
    amount = 0,
    {
        widget_success_url,
        widget_fail_url,
        merchant_site_public_key,
        widget_alias_code
    }
) {
    const publicKey = merchant_site_public_key;

    const successUrl = widget_success_url || '';

    const failUrl = widget_fail_url || '';

    const widgetAlias = widget_alias_code || '';

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
