const http = require('http');
const app = require('./app');

//create the port
const port = process.env.PORT || 8000;
//create the server
const server = http.createServer(app);
//connect the port to the server and put it to listen the requests
server.listen(port);
