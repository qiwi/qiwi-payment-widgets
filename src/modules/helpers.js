import {color} from './styles';
const COMPONENTS_WITH_SUM_SELECTION_NAMES = ['Form', 'Forms'];
export const CHARITY_MARKETING_CATEGORY = 'Благотворительность';

export function convertHexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function getContrastColorByBackground(backgroundColor) {
    const rgbBackgroundColor = convertHexToRgb(backgroundColor);
    if (rgbBackgroundColor) {
        let a = 1 - (0.299 * rgbBackgroundColor.r + 0.587 * rgbBackgroundColor.g + 0.114 * rgbBackgroundColor.b) / 255;
        return a <= 0.34 ? color.BLACK : color.WHITE;
    } else return null;
}

export function stylesArrayToObject(styles) {
    if (!styles) return {};

    return styles.reduce((acc, item) => {
        acc[item.widgetStyleCode] = item.widgetStyleValue;
        return acc;
    }, {});
}

export function componentHasSumSelection (component) {
    return COMPONENTS_WITH_SUM_SELECTION_NAMES.includes(component.name);
}

export function getImageByURL(url) {
    return new Promise(function (resolve) {
        let testImg = new Image();

        let timedOut = false;
        let timer;
        testImg.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                resolve(testImg);
            }
        };
        testImg.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            testImg.src = '??/invalidUrl.jpg';
        }, 5000);
    })
}

export function isBrowserSupportsSvg () {
    return typeof SVGRect !== 'undefined';
}

export function formatURLFromReferrer (URL) {
    URL = URL.replace(/^((http|https)\:\/\/)?(www\.)?/, '');
    return URL;
}