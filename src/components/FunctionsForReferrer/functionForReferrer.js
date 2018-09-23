export function changesForReferrer(URL) {
    URL = URL.replace(/^\w{2,10}\:\/\/www\./, "");
    return URL;
}
