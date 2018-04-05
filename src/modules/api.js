function makeRequest (id, type) {
    let url = 'https://my.qiwi.com/partners_api/merchant_widget_info';

    let param = `merchant_public_key=${id}`;

    if (type === 'alias') {
        param = `merchant_alias_code=${merchantAlias}`;
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

                throw new Error('LoadError');
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
