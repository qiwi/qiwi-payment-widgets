const path = require('path');
const express = require('express');

const app = express();

const port = 9290;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/widgets'));

app.get('/', (req, res) =>{

    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/widget300x300', (req, res) =>{
    res.sendFile(path.join(__dirname, '/widgets/widget300x300/index.html'));
});

app.listen(port, (err) =>  {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Start at ' + port);
});