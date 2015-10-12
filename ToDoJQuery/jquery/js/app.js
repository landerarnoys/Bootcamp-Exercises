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
			//this.todos = util.store('todos-jquery');
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
			this.$clearBtn = this.$footer.find('#clear-completed');
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
			//var todos = this.getFilteredTodos();
            var todos = todoRepo.getList(this.filter);
			this.$todoList.html(this.todoTemplate(todos));
			this.$main.toggle(todos.length > 0);
			this.$toggleAll.prop('checked', todoRepo.getActiveTodos().length === 0);
			this.renderFooter();
			this.$newTodo.focus();
            todoRepo.store();
		},
		renderFooter: function () {
			var todoCount = todoRepo.getList(this.filter).length;
			var activeTodoCount = todoRepo.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			this.$footer.toggle(todoCount > 0).html(template);
		},
		toggleAll: function (e) {
			var isChecked = $(e.target).prop('checked');

			todoRepo.getList(this.filter).forEach(function (todo) {
				todo.completed = isChecked;
			});

			this.render();
		},

		destroyCompleted: function () {
            console.log('testestes');
			todoRepo.removeAll();
			this.filter = 'all';
			this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array

		create: function (e) {
			var $input = $(e.target);
			var val = $input.val().trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

            todoRepo.add(val);

			$input.val('');

			this.render();
		},
        indexFromEl:  function(el) {
                    //verplqqsten
                    var id = $(el).closest('li').data('id');

                    var i = todoRepo.getList().length;

                    while (i--) {
                        if (todoRepo.getList()[i].id === id) {
                            return i;
                        }
                    }
        },
        destroy: function (target){
            todoRepo.destroy(this.indexFromEl(target));
        },

        remove: function(e){
            todoRepo.getList(this.indexFromEl(e.target));
        },

		toggle: function (e) {
			var i = this.indexFromEl(e.target);
			todoRepo.getList(this.filter)[i].completed = !todoRepo.getList(this.filter)[i].completed;
			this.render();
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

			var i = todoRepo.indexFromEl(el);

			if (val) {
				todoRepo.get(i).title = val;
			} else {
				todoRepo.getList().splice(i, 1);
			}

			this.render();
		},
		destroy: function (e) {
			todoRepo.destroy(e.target)
			this.render();
		}
	};

	App.init();
});
