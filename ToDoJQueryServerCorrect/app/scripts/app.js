/*global jQuery, Handlebars, Router */
jQuery(function ($) {
    'use strict';

    Handlebars.registerHelper('eq', function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });

    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    var App = {
        init: function () {
            todoRepo.init();
            this.cacheElements();
            this.bindEvents();

            new Router({
                '/:filter': function (filter) {
                    this.filter = filter;
                    this.render();
                }.bind(this)
            }).init('/all');
        },
        cacheElements: function () {
            this.todoTemplate = Handlebars.compile($('#todo-template').html());
            this.footerTemplate = Handlebars.compile($('#footer-template').html());
            this.$todoApp = $('#todoapp');
            this.$header = this.$todoApp.find('#header');
            this.$main = this.$todoApp.find('#main');
            this.$footer = this.$todoApp.find('#footer');
            this.$newTodo = this.$header.find('#new-todo');
            this.$toggleAll = this.$main.find('#toggle-all');
            this.$todoList = this.$main.find('#todo-list');
            this.$count = this.$footer.find('#todo-count');
            //this.$clearBtn = this.$footer.find('#clear-completed');
        },
        bindEvents: function () {
            var list = this.$todoList;
            this.$newTodo.on('keyup', this.create.bind(this));
            this.$toggleAll.on('change', this.toggleAll.bind(this));
            this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
            list.on('change', '.toggle', this.toggle.bind(this));
            list.on('dblclick', 'label', this.edit.bind(this));
            list.on('keyup', '.edit', this.editKeyup.bind(this));
            list.on('focusout', '.edit', this.update.bind(this));
            list.on('click', '.destroy', this.destroy.bind(this));
        },
        render: function () {
            //var todos = todoRepo.getList(this.filter);

            console.log(this.filter);
            todoRepo.getList(this.filter, todos => {
                this.$todoList.html(this.todoTemplate(todos));
                this.$main.toggle(todos.length > 0);
                this.$toggleAll.prop('checked', this.hasActiveItems(todos));
                this.renderFooter(todos);
                this.$newTodo.focus();
                //todoRepo.storeItems();
            });
        },
        renderFooter: function (todos) {
            var todoCount = todos.length;
            var activeTodoCount = this.getActiveLength;
            var template = this.footerTemplate({
                activeTodoCount: activeTodoCount,
                activeTodoWord: util.pluralize(activeTodoCount, 'item'),
                completedTodos: todoCount - activeTodoCount,
                filter: this.filter
            });

            this.$footer.toggle(todoCount > 0).html(template);
        },

        hasActiveItems: function (todos) {

            var result = _.filter(todos, function (todo) {
                return todo.completed === true;
            });
            return result.length > 0;
        },

        getActiveLength: function (todos) {
            var result = _.filter(todos, function (todo) {
                return todo.completed === false;
            });
            return result.length;
        },

        toggleAll: function (e) {


            var isChecked = $(e.target).prop('checked');
            todoRepo.toggleAll(isChecked, function () {

                this.render();

            }.bind(this));
        },
        getFilteredTodos: function () {
            return todoRepo.getList(this.filter);
        },
        destroyCompleted: function () {
            todoRepo.destroyCompleted();
            this.filter = 'all';
            this.render();
        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        idFromEl: function (el) {
            var id = $(el).closest('li').data('id');

            return id;
        },
        create: function (e) {
            var $input = $(e.target);
            var val = $input.val().trim();

            if (e.which !== ENTER_KEY || !val) {
                return;
            }

            todoRepo.add(val, function () {
                $input.val('');
                this.render();
            }.bind(this));
        },
        toggle: function (e) {
            var id = this.idFromEl(e.target);
            todoRepo.get(id, function (todo) {

                todo.completed = !todo.completed;

                todoRepo.saveItem(todo, function () {

                    this.render();

                }.bind(this));
            }.bind(this));
        },
        edit: function (e) {
            var $input = $(e.target).closest('li').addClass('editing').find('.edit');
            $input.val($input.val()).focus();
        },
        editKeyup: function (e) {
            if (e.which === ENTER_KEY) {
                e.target.blur();
            }
            if (e.which === ESCAPE_KEY) {
                $(e.target).data('abort', true).blur();
            }
        },
        update: function (e) {
            var el = e.target;
            var $el = $(el);
            var val = $el.val().trim();

            if ($el.data('abort')) {
                $el.data('abort', false);
                this.render();
                return;
            }

            var id = this.idFromEl(el);


            if (val) {

                todoRepo.get(id, function (todo) {

                    todo.title = val;

                    todoRepo.saveItem(todo, function () {

                        this.render();

                    }.bind(this));
                }.bind(this));

            } else {
                //todos[id].splice(i, 1);

                todoRepo.remove(this.idFromEl(e.target), function () {
                    this.render();
                }.bind(this));

            }

            this.render();
        },
        destroy: function (e) {
            todoRepo.remove(this.idFromEl(e.target), function () {
                this.render();
            }.bind(this));
        }
    };

    App.init();
});
