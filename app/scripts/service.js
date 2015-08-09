(function ($, localStorage) {
    'use strict';

    App.module.service = (function () {

        function addNewTask(taskName) {
            var toDoTasksList = getStorageArray('toDoTasksList');

            toDoTasksList.push(taskName);

            setStorageArray('toDoTasksList', toDoTasksList);
        }

        function moveTaskToProgres(taskName){
            var toDoTasksList = getStorageArray('toDoTasksList');
            var inProgressTasks = getStorageArray('inProgressTasks');

            var index = toDoTasksList.indexOf(taskName);
            toDoTasksList.splice(index, 1);

            inProgressTasks.push(taskName);

            setStorageArray('toDoTasksList', toDoTasksList);
            setStorageArray('inProgressTasks', inProgressTasks);
        }

        function moveTaskToDone(taskName){
            var doneTasks = getStorageArray('doneTasks');
            var inProgressTasks = getStorageArray('inProgressTasks');

            var index = inProgressTasks.indexOf(taskName);
            inProgressTasks.splice(index, 1);

            doneTasks.push(taskName);

            setStorageArray('doneTasks', doneTasks);
            setStorageArray('inProgressTasks', inProgressTasks);
        }

        function getAllDoneTasks(){
            return getStorageArray('doneTasks');
        }

        function getAllInProgressTasks(){
            return getStorageArray('inProgressTasks');
        }

        function getAllToDoTasks(){
            return getStorageArray('toDoTasksList');
        }

        function getStorageArray(storageName){
            return JSON.parse(localStorage[storageName]);
        }

        function setStorageArray(storageName, obj){
            localStorage[storageName] = JSON.stringify(obj);
        }

        function init() {
            if(!localStorage.toDoTasksList){
                localStorage.toDoTasksList = JSON.stringify([]);
            }

            if(!localStorage.inProgressTasks){
                localStorage.inProgressTasks = JSON.stringify([]);
            }

            if(!localStorage.doneTasks){
                localStorage.doneTasks = JSON.stringify([]);
            }
        }

        function deleteToDoTask(taskName) {
            deleteTask(taskName, 'toDoTasksList');
        }

        function deleteInProgressTasks(taskName) {
            deleteTask(taskName, 'inProgressTasks');
        }

        function deleteDoneTask(taskName) {
            deleteTask(taskName, 'doneTasks');
        }

        function deleteTask(taskName, taskStorageArrayName) {
            var tasksList = getStorageArray(taskStorageArrayName);

            var index = tasksList.indexOf(taskName);
            tasksList.splice(index, 1);

            setStorageArray(taskStorageArrayName, tasksList);
        }

        $(function () {
            init();
        });

        return {
            addTask: addNewTask,
            moveTaskToProgres: moveTaskToProgres,
            moveTaskToDone: moveTaskToDone,
            getAllDoneTasks: getAllDoneTasks,
            getAllInProgressTasks: getAllInProgressTasks,
            getAllToDoTasks: getAllToDoTasks,
            deleteToDoTask: deleteToDoTask,
            deleteInProgressTasks: deleteInProgressTasks,
            deleteDoneTask: deleteDoneTask
        };
    }());
}(jQuery, window.localStorage));