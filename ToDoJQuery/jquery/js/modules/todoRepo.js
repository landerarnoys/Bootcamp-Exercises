//get, delete single item
    var todoRepo = (function(){

        var todos = [];



        function init() {
           todos = util.store('todos-jquery');
        }


        function getList(filter){
            if (filter === 'active') {
                return this.getActiveTodos();
            }

            if (filter === 'completed') {
                return this.getCompletedTodos();
            }

            return todos;
        }

        function getActiveTodos() {
            return todos.filter(function(todo) {
                return !todo.completed;
            });
        }

        function getCompletedTodos() {
            return todos.filter(function (todo) {
                return todo.completed;
            });
        }

        function store(){
            util.store('todos-jquery', todos);
        }

        //add a new note to the todos array
        function add(val){

            todos.push({
                id: util.uuid(),
                title: val,
                completed: false
            });
        }

        function get(i){
            return getList()[i];
        }

        function destroy(id){
            return todos.splice(id, 1);
        }

        function remove(id){
            return todos.splice(id,1);
        }



        function removeAll(){
            todos = getActiveTodos();
        }



        return {
            init: init,
            getList : getList,
            getActiveTodos : getActiveTodos,
            getCompletedTodos : getCompletedTodos,
            add : add,
            store : store,
            get : get,
            destroy : destroy,
            removeAll : removeAll
        }

    })();
