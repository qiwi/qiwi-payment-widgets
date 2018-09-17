export function correctURLAfterReferrer(URL) {
    // если нет протокола
    if(!URL.match(/:\/\//, "")){
        return URL.replace(/(^www.)/, "");
    }
    // ищем и меняем "://www." на "://"
    return URL.replace(/(:\/\/\www\.)/, "://");
};