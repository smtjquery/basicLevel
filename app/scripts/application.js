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
        function init() { }

        /**
         * Run init when browser is ready.
         *
         * @private
         */
        $(function () {
            init();
            showAllTasks();
            $("a").click(function () {
                var taskName = $(this).parent().prev().text();
                var typeOfOperation = $(this).text();
                if (typeOfOperation == 'move to progress') {
                    moveToProgress(taskName);
                }
                else {
                    moveToDone(taskName)
                }
                location.reload();
            });
        });

        function clearLocalStorage()
        {
            window.localStorage.clear();
            location.reload();
            showAllTasks();
        }

        function addNewTask() {
            var taskName = $("#new-task").val();
            App.module.service.addTask(taskName);
            showAllTasks();
            location.reload();
        }

        function moveToProgress(taskName) {
            App.module.service.moveTaskToProgres(taskName);
            showAllTasks();
        }

        function moveToDone(taskName) {
            App.module.service.moveTaskToDone(taskName);
            showAllTasks();
        }

        function showAllTasks() {
            showToDoTasks();
            showInProgressTasks();
            showDoneTasks();
        }

        function showToDoTasks() {
            $("#toDo").find(".task").remove();
            var taskSchemaBeginning = "<div class=\"task\"><div class=\"title\">";
            var taskSchemaEnding = "</div><div class=\"actions\"><span>Actions:</span><a href=\"#\" >move to progress</a></div><div class=\"close glyphicon glyphicon-remove\"></div></div>";
            var tasks = "";
            var todo = App.module.service.getAllToDoTasks();
            $.each(todo, function (index, value) {
                var task = taskSchemaBeginning + value + taskSchemaEnding;
                tasks = tasks + task;
            });

            $("#toDo").append(tasks);
        }

        function showInProgressTasks() {
            $("#inProgress").find(".task").remove();
            var taskSchemaBeginning = "<div class=\"task\"><div class=\"title\">";
            var taskSchemaEnding = "</div><div class=\"actions\"><span>Actions:</span><a href=\"#\" >move to done</a></div><div class=\"close glyphicon glyphicon-remove\"></div></div>";
            var tasks = "";
            var todo = App.module.service.getAllInProgressTasks();
            $.each(todo, function (index, value) {
                var task = taskSchemaBeginning + value + taskSchemaEnding;
                tasks = tasks + task;
            });

            $("#inProgress").append(tasks);
        }

        function showDoneTasks() {
            $("#done").find(".task").remove();
            var taskSchemaBeginning = "<div class=\"task\"><div class=\"title\">";
            var taskSchemaEnding = "</div><div class=\"actions\"></div><div class=\"close glyphicon glyphicon-remove\"></div></div>";
            var tasks = "";
            var done = App.module.service.getAllDoneTasks();
            $.each(done, function (index, value) {
                var task = taskSchemaBeginning + value + taskSchemaEnding;
                tasks = tasks + task;
            });

            $("#done").append(tasks);
        }

        return {
            addNewTask: addNewTask,
            moveToProgress: moveToProgress,
            showToDoTasks: showToDoTasks,
            clearLocalStorage: clearLocalStorage,
        };

    }());

}(jQuery, App.module.service));