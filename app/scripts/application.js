(function ($, service) {
    'use strict';

    /**
     * Main app module pattern
     *
     * @module App
     * @requires jQuery
     * @requires services
     */

    App.module.application = (function () {

        /**
         * Initialize application
         *
         * @private
         */

        $("button").click(function () {
            addNewTask();
            location.reload();
        })

        function deleteTask(taskName, taskType) {
            if (taskType == "toDoTasks")
                service.deleteToDoTask(taskName);
            else if (taskType == "inProgressTasks")
                service.deleteInProgressTasks(taskName);
            else if (taskType == "doneTasks")
                service.deleteDoneTask(taskName);
            location.reload();
        }

        function moveToProgress(taskName) {
            service.moveTaskToProgres(taskName);
        }

        function moveToDone(taskName) {
            service.moveTaskToDone(taskName);
        }

        function addNewTask() {
            var taskName = $("#new-task").val();
            service.addTask(taskName);
        }

        function showAllTasks() {
            showToDoTasks();
            showInProgressTasks();
            showDoneTasks();
        }

        function showToDoTasks() {
            var toDoTaskList = service.getAllToDoTasks();
            var taskContent = '<div class="task"><div id="{1}" class="title">{0}</div><div class="actions"><span>Actions:</span><a href="#">move to progress</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
            var taskGroupIdSelector = "#toDoTasks";

            showTasks(toDoTaskList, taskContent, taskGroupIdSelector);
        }

        function showInProgressTasks() {
            var inProgressTasksList = service.getAllInProgressTasks();
            var taskContent = '<div class="task"><div id="{1}" class="title">{0}</div><div class="actions"><span>Actions:</span><a href="#">move to done</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
            var taskGroupIdSelector = "#inProgressTasks";

            showTasks(inProgressTasksList, taskContent, taskGroupIdSelector);
        }

        function showDoneTasks() {
            var doneTasksList = service.getAllDoneTasks();
            var taskContent = '<div class="task"><div id="{1}" class="title">{0}</div><div class="close glyphicon glyphicon-remove"></div></div>';
            var taskGroupIdSelector = "#doneTasks";

            showTasks(doneTasksList, taskContent, taskGroupIdSelector);
        }

        function showTasks(tasksList, taskContent, taskGroupIdSelector) {
            var toDoTasks = "";

            $.each(tasksList, function (i, val) {
                var task = String.format(taskContent, val, i)
                toDoTasks = toDoTasks + task;
            })

            $(taskGroupIdSelector).append(toDoTasks);
        }

        // String.format from http://jsfiddle.net/joquery/9KYaQ/
        String.format = function () {

            var theString = arguments[0];

            for (var i = 1; i < arguments.length; i++) {
                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");

                theString = theString.replace(regEx, arguments[i]);
            }

            return theString;
        }

        function init() {
            showAllTasks();
        }

        /**
         * Run init when browser is ready.
         *
         * @private
         */
        $(function () {
            init();

            $("a").click(function () {
                var operationType = $(this).text();
                var taskName = $(this).parent().parent().find(".title").text()

                if (operationType == 'move to progress')
                    moveToProgress(taskName);
                if (operationType == 'move to done')
                    moveToDone(taskName);
                location.reload();
            });

            $('div[class="close glyphicon glyphicon-remove"]').click(function () {

                var tag = $(this).parent();
                var taskType = tag.parent().attr('id');
                var taskName = tag.find(".title").text();

                deleteTask(taskName, taskType);
            })
        });

        return {};

    }());

}(jQuery, App.module.service));