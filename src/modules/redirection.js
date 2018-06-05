import { getHostName } from './parsers';

function makeLinkCheckout (params) {
    const url = 'https://oplata.qiwi.com/create';
    const parsedParams = new URLSearchParams(params);

    return `${url}?${parsedParams.toString()}`;
}

export default function redirection (
    amount = 0,
    {
        merchant_success_url,
        merchant_fail_url,
        merchant_public_key,
        merchant_alias_code
    }
) {
    const public_key = merchant_public_key;

    const success_url = merchant_success_url || '';

    const fail_url = merchant_fail_url || '';

    const extra_widget_alias = merchant_alias_code || '';

    const extra_widget_refferer = getHostName(document.referrer);

    if (public_key) {
        const checkoutParams = {
            public_key,
            amount,
            success_url,
            fail_url,
            extra_widget_alias,
            extra_widget_refferer
        };

        let link = makeLinkCheckout(checkoutParams);

        window.open(link, '_blank');
    }
}
