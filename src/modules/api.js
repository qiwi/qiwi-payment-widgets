import config from '../config/default';

function makeRequest (id, type, noCache) {
    let url = config.url;
    let params = `merchantSitePublicKey=${id}`;

    if (type === 'alias') {
        params = `widgetAliasCode=${id}`;
    }

    if (noCache) {
        params += '&noCache=1';
    }

    return fetch(`${url}?${params}`, {
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

export async function getMerchantInfoByAlias (alias, noCache) {
    try {
        const data = await makeRequest(alias, 'alias', noCache);

        return data.result;
    } catch (err) {
        throw err;
    }
}

export async function getMerchantInfoByKey (key, noCache) {
    try {
        const data = await makeRequest(key, 'key', noCache);

        return data.result;
    } catch (err) {
        throw err;
    }
}
