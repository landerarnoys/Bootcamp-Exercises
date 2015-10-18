var todoRepo = (function() {
    'use strict';

    //var todos = [];

    function init() {
        //todos = util.store('todos-jquery');
    }

    function add(title, callback) {

        var todo = {
            id: util.uuid(),
            title: title,
            completed: false
        };

        //todos.push(todo);
        //return todo;

        todo = JSON.stringify(todo);

        //$.ajax('http://localhost:8080/api/todos/', todo, callback);

        $.ajax({
            method : 'post',
            url : 'http://localhost:8080/api/todos/',
            data : todo,
            dataType: 'json',
            contentType : 'application/json'
        }).done(callback);

    }

    function remove(id, callback) {
        //todos.splice(id, 1);

        $.ajax({
            method : 'delete',
            url : 'http://localhost:8080/api/todos/' + id
        }).done(callback);

    }

    function get(id, callback) {
        //return todos[id];

        $.get('http://localhost:8080/api/todos/' + id, function(data) {
            callback(data);
        });

    }

    //function hasActiveItems() {
    //    return getList('active').length === 0;
    //}

    function storeItems() {
         util.store('todos-jquery', todos);
    }

    function saveItem(item, callback) {
        $.ajax({
            method : 'put',
            url : 'http://localhost:8080/api/todos/' + item.id,
            data : JSON.stringify(item),
            dataType: 'json',
            contentType : 'application/json'
        }).done(callback);
    }

    function getList(filter, callback) {


        $.get('http://localhost:8080/api/todos/', function(data) {
            var filteredData = data;

            if (filter === 'active') {
                filteredData = _getActiveTodos(data);
            }

            if (filter === 'completed') {
                filteredData = _getCompletedTodos(data);
            }


            callback(filteredData);

        });
    };


    function _getActiveTodos(data) {
        return data.filter(function (todo) {
            return !todo.completed;
        });
    }

    function _getCompletedTodos(data) {
        return data.filter(function (todo) {
            return todo.completed;
        });
    }

    //function store() {
    //    util.store('todos-jquery', todos);
    //}

    function toggleAll(active, callback) {
        //todos.forEach(function (todo) {
        //    todo.completed = active;
        //});

        var toggle = {
            checked : active
        };

        $.ajax({
            method : 'put',
            url : 'http://localhost:8080/api/todos/toggleAll',
            data : JSON.stringify(toggle),
            dataType: 'json',
            contentType : 'application/json'
        }).done(callback);
    }

    function destroyCompleted() {
        todos = getList('active');
    }


    return {
        init : init,
        add : add,
        remove : remove,
        get : get,
        getList : getList,
        saveItem : saveItem,
        toggleAll : toggleAll,
        storeItems : storeItems,
        destroyCompleted : destroyCompleted,
        //hasActiveItems : hasActiveItems
    }
})();
