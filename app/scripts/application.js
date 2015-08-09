(function ($, service, tasks) {
    'use strict';

    /**
     * Main app module pattern
     *
     * @module App
     * @requires jQuery
     * @requires service
     */
    App.module.application = (function () {

        /**
         * Task name input
         */
        var input;

        /**
         * Create new task button
         */
        var btnNewTask;

        /**
         * Name of dropable source container
         */
        var srcDropableName;

        /**
         * Render functions
         *
         * @type {{todo: renderTodoList, inprogress: renderInprogressList, done: renderDoneList}}
         */
        var render = {
            'todo': tasks.renderTodoList,
            'inprogress': tasks.renderInprogressList,
            'done': tasks.renderDoneList,
        };

        /**
         * Get task type funcions
         *
         * @type {{todo: getAllToDoTasks, inprogress: getAllInProgressTasks, done: getAllDoneTasks}}
         */
        var allTasks = {
            'todo': service.getAllToDoTasks,
            'inprogress': service.getAllInProgressTasks,
            'done': service.getAllDoneTasks,
        };

        /**
         * Initialize application
         *
         * @private
         */
        function init() {
            initElements();
            initActions();
            showAllTasks();
        }

        /**
         * Run init when browser is ready.
         *
         * @private
         */
        $(function () {
            init();
        });

        return {};

        /**
         * INitialize elements
         */
        function initElements() {
            input = $('#new-task');
            btnNewTask = $('#create-new-task');
        }

        /**
         * Initialize actions
         */
        function initActions() {

            /**
             * Init create new task action
             */
            btnNewTask.off('click').on('click', function (e) {

                var taskName = getNewTaskName();
                if (taskName) {
                    addNewTask(taskName);
                }
                else {
                    alert("Please fill task name first.");
                }
                e.stopPropagation();
            });

            /**
             * Init move to in progress list action
             */
            $(tasks.getTodo()).on('click', '.actions a', function () {
                moveToProgress(tasks.getName(this));
            });

            /**
             * Init move to done list action
             */
            $(tasks.getInprogress()).on('click', '.actions a', function () {
                moveToDone(tasks.getName(this));
            });

            /**
             * Init close task
             */
            $('.row').on('click', '.close', function () {
                var taskName = $(this).parent().find('.title').text();
                var srcContainer = $(this).parent().parent().attr('id');
                closeTask(taskName, srcContainer);
            });

            /**
             * INit droppable containers
             */
            $('.tasks-list').droppable({
                drop: function(ev, ui) {
                    if (srcDropableName !== this.id) {
                        var taskName = $(ui.draggable).find('.title').text();
                        $(ui.draggable).remove();
                        moveTask(taskName, srcDropableName, this.id);
                    }
                }
            });
        }

        function closeTask(taskName, srcContainer) {
            console.log(taskName, srcContainer);
            service.removeTask(taskName, srcContainer);
            render[srcContainer](allTasks[srcContainer]());
            initDraggable();
        }

        /**
         *
         * @param {string} task - name
         * @param {string} srcContainer - id
         * @param {string} targetContainer - id
         */
        function moveTask(task, srcContainer, targetContainer) {
            service.moveTask(task, srcContainer, targetContainer);
            render[srcContainer](allTasks[srcContainer]());
            render[targetContainer](allTasks[targetContainer]());
            initDraggable();
        }

        /**
         * Move to progress list
         * @param {string} taskName
         */
        function moveToProgress(taskName) {
            moveTask(taskName, 'todo', 'inprogress')
        }

        /**
         * Move to done list
         * @param {string} taskName
         */
        function moveToDone(taskName) {
            moveTask(taskName, 'inprogress', 'done')
        }

        /**
         * Get name of new task
         *
         * @returns {string}
         */
        function getNewTaskName() {

            var name = input.val();
            input.val('');

            return name;
        }

        /**
         * Add new task
         * @param taskName
         */
        function addNewTask(taskName) {
            service.addTask(taskName);
            tasks.renderTodoList(service.getAllToDoTasks());
            initDraggable();
        }

        /**
         * Render all tasks
         */
        function showAllTasks() {
            tasks.renderTodoList(service.getAllToDoTasks());
            tasks.renderInprogressList(service.getAllInProgressTasks());
            tasks.renderDoneList(service.getAllDoneTasks());
            initDraggable();
        }

        function initDraggable() {
            $('.task').draggable({
                start: function(event, ui) {
                    srcDropableName = $(this).parent().attr('id');
                },
                revert: true
            });
        }
    }());

}(jQuery, App.module.service, App.module.taskList));
