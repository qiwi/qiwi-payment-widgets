const COLOR = {
    BLACK: '#000000',
    WHITE: '#FFFFFF'
};

function convertHexToRgb (hex) {
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

export function getTextColorByBackground (backgroundColor) {
    const rgbBackgroundColor = convertHexToRgb(backgroundColor);
    if (rgbBackgroundColor) {
        let a = 1 - (0.299 * rgbBackgroundColor.r + 0.587 * rgbBackgroundColor.g + 0.114 * rgbBackgroundColor.b) / 255;
        return a < 0.5 ? COLOR.BLACK : COLOR.WHITE;
    } else return null;
}