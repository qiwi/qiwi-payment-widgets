import { getHostName } from './parsers';

function makeLinkCheckout (params) {
    const url = 'https://oplata.qiwi.com/create';
    const parsedParams = new URLSearchParams(params);

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
    const public_key = merchant_site_public_key;

    const success_url = widget_success_url || '';

    const fail_url = widget_fail_url || '';

    const extra_widget_alias = widget_alias_code || '';

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
