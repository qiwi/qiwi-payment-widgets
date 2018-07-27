
function polyfill () {
    if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
        // Yes, there's really no need for `Object.defineProperty` here
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }
}

polyfill();