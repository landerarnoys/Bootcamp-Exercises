var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var todosAPI = require('./todos');
var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use('/api/todos', todosAPI);

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    console.log('Node server started listening on port:' + port)
});
