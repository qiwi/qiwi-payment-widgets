import {getAlias, getPublicKey, getNoCacheFlag} from './parsers';
import {getWidgetInfoByAlias, getWidgetInfoByKey} from './api';
import WidgetComponent from '../components/Widget';
import {stylesArrayToObject} from './helpers';
import {styleCode} from './styles'

export default class Widget {
    constructor (elements, widgetType) {
        this._render(elements);
        this.alias = getAlias();
        this.widgetType = widgetType;
        this.publicKey = getPublicKey();
        this.noCache = getNoCacheFlag();
    }

    async init () {
        let data = {};

        try {
            if (this.alias) {
                data = await getWidgetInfoByAlias(this.alias, this.noCache);
            } else if (this.publicKey) {
                data = await getWidgetInfoByKey(this.publicKey, this.noCache);
            } else {
                throw new Error('No public key or alias in url');
            }
            data.widgetStyles = stylesArrayToObject(data.widgetStyles);

            this._addMetricCounter(data.widgetMerchantMetric);

            if (this.widgetType === EWidgetsTypes.BUTTON_WIDGET) {
                delete data.widgetStyles[styleCode.WIDGET_BACKGROUND];
            }

            this._addBackground(data.widgetStyles[styleCode.WIDGET_BACKGROUND]);
            this.widget.init(data);
        } catch (err) {
            console.warn('Widget is disabled by: ', err.errorText);
            this.widget.dispose(err);
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

    _changeTabTitle (title) {
        document.title = title;
    }

    _addBackground (color) {
        if (color) {
            this.widget.element.style.backgroundColor = color;
        }
    }

    _render (elements) {
        this.widget = new WidgetComponent(elements);
        document.body.appendChild(this.widget.element);
    }

    _endLoading () {
        document.querySelector('#loader').style.display = 'none';

        this.widget.show();
    }
}

export const EWidgetsTypes = Object.freeze({
    BIG_WIDGET: 'BIG_WIDGET',
    MIDDLE_WIDGET: 'MIDDLE_WIDGET',
    SMALL_WIDGET: 'SMALL_WIDGET',
    BUTTON_WIDGET: 'BUTTON_WIDGET'
});