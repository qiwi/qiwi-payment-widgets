const path = require('path');
const querystring = require('querystring');
const express = require('express');


const getFolders = require('./tools/utils/getFolders.js');

const scriptsPath = 'widgets';

const folders = getFolders(scriptsPath);


let tempData = [];

try {
    let specs = require('./widgets/specs.json');

    folders.forEach((folder) => {
        specs[folder].params = querystring.stringify(specs[folder].params);

        tempData.push(specs[folder]);
    });
}
catch (err) {

    console.log("Unable to read file './widgets/specs.json': ", err);
    console.log("First, run 'npm run build' command");
}



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