import config from '../config/default';
import ErrorInfo from './ErrorInfo'

function makeRequest(id, type, noCache) {
    let url = config.url;
    let params = `merchantSitePublicKey=${id}`;

    if (type === 'alias') {
        params = `widgetAliasCode=${id}`;
    }

    if (noCache) {
        params += `&noCache=${noCache}`;
    }
    let errorInfoResponse;
    return fetch(`${url}?${params}`, {
        mode: 'cors'
    })
        .then((response) => {
            if (response.status >= 400) {
                window.dataLayer.push({
                    event: 'load.error',
                    eventAction: 'Mechant name load error'
                });
                errorInfoResponse = response;
                throw response;
            }
            return response;
        })
        .then((response) => response.json(),
            (response) => response.json()
                .then((response) => {
                    return fetch(`https://kassa.qiwi.com/rnd_locale/message?text_code=${response.error}&application_code=WIDGETS`)
                        .then((response) => response.json())
                        .then((result) => {
                            throw new ErrorInfo(errorInfoResponse, result.result.text);
                        });
                }))
}

export async function getMerchantInfoByAlias(alias, noCache) {
    try {
        const data = await makeRequest(alias, 'alias', noCache);

        return data.result;
    } catch (err) {
        throw err;
    }
}

export async function getMerchantInfoByKey(key, noCache) {
    try {
        const data = await makeRequest(key, 'key', noCache);

        return data.result;
    } catch (err) {
        throw err;
    }
}
