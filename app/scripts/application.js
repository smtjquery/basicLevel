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

        var input;

        var btnNewTask;

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
                moveToProgress(this);
            });

            /**
             * Init move to done list action
             */
            $(tasks.getInprogress()).on('click', '.actions a', function () {
                moveToDone(this);
            });
        }

        /**
         * Move to progress list
         * @param {$} elem
         */
        function moveToProgress(elem) {
            service.moveTaskToProgres(tasks.getName(elem));
            tasks.renderTodoList(service.getAllToDoTasks());
            tasks.renderInprogressList(service.getAllInProgressTasks());
        }

        /**
         * Move to done list
         * @param {$} elem
         */
        function moveToDone(elem) {
            service.moveTaskToDone(tasks.getName(elem));
            tasks.renderInprogressList(service.getAllInProgressTasks());
            tasks.renderDoneList(service.getAllDoneTasks());
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
        }

        /**
         * Render all tasks
         */
        function showAllTasks() {
            tasks.renderTodoList(service.getAllToDoTasks());
            tasks.renderInprogressList(service.getAllInProgressTasks());
            tasks.renderDoneList(service.getAllDoneTasks());
        }

    }());

}(jQuery, App.module.service, App.module.taskList));


