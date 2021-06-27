const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// An api endpoint that returns a short list of items
app.get('/login', (req,res) => {
    setTimeout(() => {
        res.send('do google auth here')
    }, 3000);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);

