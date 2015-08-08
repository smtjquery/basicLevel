(function ($) {
    'use strict';

    App.module.taskList = (function () {

        var tasks = {
            list: []
        };

        /**
         * Get todo list
         * @returns $
         */
        function getTodo() {
            return tasks.list[0];
        }

        /**
         * Get in progress list
         * @returns $
         */
        function getInprogress() {
            return tasks.list[1];
        }

        /**
         * Get done list
         * @returns $
         */
        function getDone() {
            return tasks.list[2];
        }

        /**
         * Get task name
         *
         * @param elem
         * @returns {string}
         */
        function getTaskName(elem) {
            return $(elem).parent().parent().find('.title').text();
        }

        /**
         * Get task template
         * @param taskName
         * @param moveTo
         * @returns {string}
         */
        function taskTemplate(taskName, moveTo) {

            moveTo = typeof moveTo !== 'undefined' ? moveTo : false;

            var actions = '<div class="actions"><span>Actions:</span>' +
                '<a href="#">move to ' + moveTo + '</a></div>';

            if (moveTo === false) {
                actions = "";
            }

            return '<div class="task">' +
                '<div class="title">' + taskName + '</div>' +
                actions +
                '<div class="close glyphicon glyphicon-remove"></div></div>';
        }

        /**
         * Render list
         *
         * @param tasks
         */
        function renderTodoList(tasks) {
            getTodo().html(renderList(tasks, "progress"));
        }

        /**
         * Render list
         *
         * @param tasks
         */
        function renderInprogressList(tasks) {
            getInprogress().html(renderList(tasks, "done"));
        }

        /**
         * Render list
         *
         * @param tasks
         */
        function renderDoneList(tasks) {
            getDone().html(renderList(tasks, false));
        }

        /**
         * Renders list
         *
         * @param tasks
         * @param actions
         * @returns {string}
         */
        function renderList(tasks, actions) {
            var tasksHtml = "";
            var id;

            for (id in tasks) {
                tasksHtml += taskTemplate(tasks[id], actions);
            }

            return tasksHtml;
        }

        /**
         * Init
         */
        function init() {
            tasks.list[0] = $('#todo.tasks-list');
            tasks.list[1] = $('#inprogress.tasks-list');
            tasks.list[2] = $('#done.tasks-list');
        }

        $(function () {
            init();
        });

        return {
            getTodo: getTodo,
            getInprogress: getInprogress,
            getDone: getDone,
            getName: getTaskName,
            getTaskTemplate: taskTemplate,
            renderTodoList: renderTodoList,
            renderInprogressList: renderInprogressList,
            renderDoneList: renderDoneList
        };
    }());
}(jQuery));