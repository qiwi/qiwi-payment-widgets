import config from '../config/default';
import ErrorInfo from './ErrorInfo'

let errorInfoResponse;

async function errorFetch (response) {
    let errorResponse = await response;
    let newResponse = await fetch(`https://kassa.qiwi.com/rnd_locale/message?text_code=${errorResponse.error}&application_code=WIDGETS`);
    let data = await newResponse.json();
    throw new ErrorInfo(errorInfoResponse, data.result.text)
}

async function makeRequestFetch (url, params) {
    let response = await fetch(`${url}?${params}`, {mode: 'cors'})
    try {
        if (response.status >= 400) {
            window.dataLayer.push({
                event: 'load.error',
                eventAction: 'Mechant name load error'
            });
            errorInfoResponse = response;
            throw response;
        } else {
            return response.json();
        }
    } catch (response) {
        return errorFetch(response.json())
    }
}

async function makeRequest(id, type, noCache) {
    let url = config.url;
    let params = `merchantSitePublicKey=${id}`;

    if (type === 'alias') {
        params = `widgetAliasCode=${id}`;
    }

    if (noCache) {
        params += `&noCache=${noCache}`;
    }

    let resultFetch = await makeRequestFetch(url, params);
    return resultFetch;
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
