import { getPublicKey } from './parsers';
import { getMerchantInfoByKey } from './api';

import Widget from '../components/Widget';

export default class widget {
    constructor (elements) {
        this._render(elements);
        this.publicKey = getPublicKey();
    }

    async init (success, error) {
        try {
            let data = {};

            if (this.publicKey) {
                data = await getMerchantInfoByKey(this.publicKey);
            } else {
                throw new Error('No public key or alias in url');
            }

            this._changeTabTitle(data.merchant_name);
            this._addMetricCounter(data.merchant_metric);
            success(data);
        } catch (err) {
            error();

            console.warn('Widget is disabled by: ', err.message);
        }

        this._endLoading();
    }

    _addMetricCounter = (counter) => {
        if (!counter) {
            return false;
        }

        try {
            const yaCounter = `yaCounter${counter}`;
            window[yaCounter] = new window.Ya.Metrika({
                id: counter,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });

            this._createYandexNoScript(counter);
        } catch (e) {}
    };

    _createYandexNoScript = (counter) => {
        const container = document.createElement('noscript');

        container.innerHTML = `<div>
            <img src="https://mc.yandex.ru/watch/${counter}" style="position:absolute; left:-9999px;" alt="" />
        </div>`;

        document.body.appendChild(container);
    };

    _changeTabTitle (title) {
        document.title = title;
    }

    _render (elements) {
        this.widget = Widget(elements);

        document.body.appendChild(this.widget.element);
    }

    _endLoading () {
        document.querySelector('#loader').style.display = 'none';

        this.widget.show();
    }
}
