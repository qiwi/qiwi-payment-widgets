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

            success(data);
        } catch (err) {
            error();

            console.warn('Widget is disabled by: ', err.message);
        }

        this._endLoading();
    }

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
