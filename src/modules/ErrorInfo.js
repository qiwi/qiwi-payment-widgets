export default class ErrorInfo extends Error {
    constructor (response, errorLocaleText) {
        super();
        this.errorStatus = response.status;
        this.errorStatusText = response.statusText;
        this.errorUrl = response.url;
        this.erroreText = errorLocaleText;
    }
}
