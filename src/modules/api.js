import config from '../config/default';

function makeRequest (id, type) {
    let url = config.url;
    let param = `merchant_site_public_key=${id}`;

    if (type === 'alias') {
        param = `widget_alias_code=${id}`;
    }

    return fetch(`${url}?${param}`, {
        mode: 'cors'
    })
        .then((response) => {
            if (response.status >= 400) {
                window.dataLayer.push({
                    event: 'load.error',
                    eventAction: 'Mechant name load error'
                });

                throw new Error('Loading info error');
            }
            return response;
        })
        .then((response) => response.json());
}

export async function getMerchantInfoByAlias (alias) {
    try {
        const data = await makeRequest(alias, 'alias');

        return data.result;
    } catch (err) {
        throw err;
    }
}

export async function getMerchantInfoByKey (key) {
    try {
        const data = await makeRequest(key, 'key');

        return data.result;
    } catch (err) {
        throw err;
    }
}
