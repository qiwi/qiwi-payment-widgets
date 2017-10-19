const path = require('path');
const querystring = require('querystring');
const express = require('express');
const request = require('request');


const widgetTemps = require('./public/widgetTemps.json');


const scriptsPath = 'widgets';


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

app.get('*', (req, res) =>{
    res.render('index.ejs', {
        widgets: tempData
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