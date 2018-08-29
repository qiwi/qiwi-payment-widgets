var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        if (false) {
            resolve();
        }
        else {
            reject({error: 'нет подключения'});
        }
    }, 200)
})
var newpromise = promise.then(function (result) {
    console.log(result.foo)
}, function (err) {
    console.log(err.error);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({errorText: 'подключитесь'})
        }, 200)
    })
})
newpromise.then(function (errText) {
    console.log(errText.errorText);
})