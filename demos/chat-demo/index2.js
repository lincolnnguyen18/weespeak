const express = require('express');
const app = express();
app.use(express.static('public'));
const port = process.env.chat_demo_port;
app.listen(port, () => { console.log(`Listening on port ${port}`) });