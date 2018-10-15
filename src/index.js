const express = require('express');
const bodyParser = require('body-parser');
const allowCors = require('./config/cors');

const app = express();

//app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(allowCors);

require('./app/controllers/index')(app);

app.listen('4000');