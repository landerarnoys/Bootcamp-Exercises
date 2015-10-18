var express = require('express');
var router = express.Router();
var _ = require('underscore');

var todos = [{
    id: 1,
    title: 'node app title 1',
    completed: false
}, {
    id: 2,
    title: 'node app title 2',
    completed: false
}];


router.get('/', function (req, res, next) {
    res.send(todos); // return all resources
});

router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var todo = _.findWhere(todos, { id : id });

    if (!todo) {
        return res.status(404).send('resource not found: ' + req.params.id); // show 404 when id not found
    }

    return res.send(todo);
});

router.post('/', function (req, res, next) {
    var resource = req.body;
    var getLastID = _.max(todos, item => item.id);
    var id = getLastID.id + 1;

    resource.id = id;
    todos.push(resource);

    res.set('location', `http://localhost:8080/api/todos/${id}`);

    return res.status(201).send(resource);

});


router.put('/toggleAll', function (req, res, next) {

    var toggle = req.body;

    _.each(todos, function(todo) {
        todo.completed = toggle.checked
    });

    return res.status(200).send(todos);

});

router.put('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var resource = req.body;
    var todo = _.findWhere(todos, { id : id });

    if (!todo) {
        return res.status(404).send('resource not found: ' + id); // show 404 when id not found
    }

    todo.title = resource.title;
    todo.completed = resource.completed;

    return res.status(200).send(todo);
});


router.delete('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var todo = _.findWhere(todos, { id : id });

    if(!todo) {
        return res.status(204);
    }

    todos = _.without(todos, todo);
    return res.status(200).send(todo);
});




module.exports = router;