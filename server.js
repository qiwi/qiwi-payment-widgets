const path = require('path');
const querystring = require('querystring');
const express = require('express');


const widgetTemps = require('./tools/widgetTemps.json');


const getFolders = require('./tools/utils/getFolders.js');

const scriptsPath = 'widgets';

const folders = getFolders(scriptsPath);


const tempData = widgetTemps.map((temp) => {
    temp.params = querystring.stringify(temp.params);
    return temp;
});





const app = express();

const port = 9290;


app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/widgets'));

app.get('/', (req, res) =>{
    res.render('index.ejs', {
        widgets: tempData
    });
});

folders.forEach(folder => {

    app.get(`/${folder}`, (req, res) =>{
        res.sendFile(path.join(__dirname, `widgets/${folder}/index.html`));
    });

});


app.listen(port, (err) =>  {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Start at ' + port);
});