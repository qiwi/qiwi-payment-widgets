import {getAlias, getPublicKey, getNoCacheFlag} from './parsers';
import {getMerchantInfoByAlias, getMerchantInfoByKey} from './api';
import WidgetComponent from '../components/Widget';
import {stylesArrayToObject} from './helpers';
import {styleCode} from './styles'

export default class Widget {
    constructor(elements, isTransparent = false) {
        this._render(elements);
        this.alias = getAlias();
        this.isTransparent = isTransparent;
        this.publicKey = getPublicKey();
        this.noCache = getNoCacheFlag();
    }

    async init() {
        let data = {};

        try {
            if (this.alias) {
                data = await getMerchantInfoByAlias(this.alias, this.noCache);
            } else if (this.publicKey) {
                data = await getMerchantInfoByKey(this.publicKey, this.noCache);
            } else {
                throw new Error('No public key or alias in url');
            }
            data.widgetStyles = stylesArrayToObject(data.widgetStyles);
            this._changeTabTitle(data.widgetMerchantName);
            this._addMetricCounter(data.widgetMerchantMetric);
            if (this.isTransparent) {
                delete data.widgetStyles[styleCode.WIDGET_BACKGROUND];
            }

            this._addBackground(data.widgetStyles[styleCode.WIDGET_BACKGROUND]);
            this.widget.init(data);
        } catch (err) {
            this.widget.dispose();
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
        } catch (e) {
        }
    };

    _createYandexNoScript = (counter) => {
        const container = document.createElement('noscript');

        container.innerHTML = `<div>
            <img src="https://mc.yandex.ru/watch/${counter}" style="position:absolute; left:-9999px;" alt="" />
        </div>`;

        document.body.appendChild(container);
    };

    _changeTabTitle(title) {
        document.title = title;
    }

    _addBackground(color) {
        if (color) {
            this.widget.element.style.backgroundColor = color;
        }
    }

    _render(elements) {
        this.widget = new WidgetComponent(elements);
        document.body.appendChild(this.widget.element);
    }

    _endLoading() {
        document.querySelector('#loader').style.display = 'none';

        this.widget.show();
    }
}
