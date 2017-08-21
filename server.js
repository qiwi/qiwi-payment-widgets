const path = require('path');
const express = require('express');

const getFolders = require('./tools/utils/getFolders.js');

const scriptsPath = 'widgets';

const folders = getFolders(scriptsPath);

const app = express();

const port = 9290;

const public_key = '5nAq6abtyCz4tcDj89e5w7Y5i524LAFmzrsN6bQTQ3ceEvMvCq55ToeErzhxNemD6rMzCtzRx9jhV5kUUUyG2BC9sqbKjkRVuFjWXicbby5XJjUAnKNcNDdfEZ';

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/widgets'));

app.get('/', (req, res) =>{
    res.render('index.ejs', {
        widgets: folders,
        public_key: public_key
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