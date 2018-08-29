import config from '../config/default';
import ErrorInfo from './ErrorInfo'

function makeRequest (id, type, noCache) {
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
        // если приходит ошибка (если resolve, то строкой выше вернется response.json()):
            (response) => response.json() // это нужно, чтобы потом обратиться к полю error (в котором содержится код ошибки, использующийся для локализации)
                .then((response) => {
                    return fetch(`https://kassa.qiwi.com/rnd_locale/message?text_code=${response.error}&application_code=WIDGETS`) // с помощью return мы передаем выше reject c promise в котором выброс ошибки, которую ловит catch в файле widget.js                        .then((response) => response.json())
                        .then((result) => {
                            throw new ErrorInfo(errorInfoResponse, result.result.text);
                        });
                }))
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
