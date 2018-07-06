import { getHostName } from './parsers';

function makeLinkCheckout (params) {
    const url = 'https://oplata.qiwi.com/create';
    const parsedParams = new URLSearchParams(params);
    console.log(parsedParams.toString());
    return `${url}?${parsedParams.toString()}`;
}

export default function redirection (
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

    const extra_widgetAlias = widget_alias_code || '';

    const extra_widgetRefferer = getHostName(document.referrer);

    if (publicKey) {
        const checkoutParams = {
            publicKey,
            amount,
            successUrl,
            failUrl,
            extra_widgetAlias,
            extra_widgetRefferer
        };

        let link = makeLinkCheckout(checkoutParams);

        window.open(link, '_blank');
    }
}
