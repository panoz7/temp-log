const express = require('express');

// Start the http server
const app = express();
global.port = 8004;
const server = app.listen(port, () => {
    console.log('Express Server Started')
})

app.use(express.json());

// Serve the api
const apiRoutes = require('./api/api.js');
app.use('/api',apiRoutes.router);

// Serve the site 
// app.use('/', express.static('site'))