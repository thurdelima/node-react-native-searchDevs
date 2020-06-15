const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

mongoose.connect('mongodb://arthur:arthur@localhost:27017/mongodb?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors()); 
app.use(express.json());
app.use(routes);



server.listen(3333);