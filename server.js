const path = require('path');
const querystring = require('querystring');
const express = require('express');
const request = require('request');


const widgetTemps = require('./public/widgetTemps.json');


const scriptsPath = 'widgets';


let dataWithAlias = JSON.parse(JSON.stringify(widgetTemps));
let dataWithPublicKey = JSON.parse(JSON.stringify(widgetTemps));

dataWithAlias = dataWithAlias.map((temp) => {
    temp.params.alias = '';
    delete temp.params.publicKey;
    temp.params = querystring.stringify(temp.params);
    return temp;
});
dataWithPublicKey = dataWithPublicKey.map((temp) => {
    temp.params = querystring.stringify(temp.params);
    return temp;
});


const app = express();

const port = 9290;

console.log(path.join(__dirname, 'public'));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/widgets/widgets'));


app.get('/', (req, res) => {
    res.render('index.ejs', {
        widgets: dataWithPublicKey
    });
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:alias', (req, res) => {
    const alias = req.params.alias;
    dataWithAlias.forEach(function (temp) {
        temp.params = querystring.parse(temp.params);
        temp.params.alias = alias;
        temp.params = querystring.stringify(temp.params);
    });
    res.render('index.ejs', {
        widgets: dataWithAlias
    });
});

app.use('/proxy', function(req, res) {
    const url = req.url.replace('/?url=','');
    req.pipe(request(url)).pipe(res);
});


app.listen(port, (err) =>  {
    if (err) {
        throw new Error(err);
    }

    console.log('Project is running at', '\x1b[34m', 'http://localhost:' + port, '\x1b[39m');
});

