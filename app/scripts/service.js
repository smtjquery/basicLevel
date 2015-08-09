(function ($, localStorage) {
    'use strict';

    App.module.service = (function () {

        /**
         * Storage names
         *
         * @type {{todo: string, inprogress: string, done: string}}
         */
        var storage = {
            "todo": "toDoTasksList",
            "inprogress": "inProgressTasks",
            "done": "doneTasks"
        };

        function addNewTask(taskName) {
            var toDoTasksList = getStorageArray('toDoTasksList');

            toDoTasksList.push(taskName);

            setStorageArray('toDoTasksList', toDoTasksList);
        }

        /**
         * can be removed
         * @param taskName
         */
        function moveTaskToProgres(taskName){
            var toDoTasksList = getStorageArray('toDoTasksList');
            var inProgressTasks = getStorageArray('inProgressTasks');

            var index = toDoTasksList.indexOf(taskName);
            toDoTasksList.splice(index, 1);

            inProgressTasks.push(taskName);

            setStorageArray('toDoTasksList', toDoTasksList);
            setStorageArray('inProgressTasks', inProgressTasks);
        }

        /**
         * Move task from source to target storage
         *
         * @param {string} taskName
         * @param {string} src
         * @param {string} target
         */
        function moveTask(taskName, src, target){
            if (src === target) {
                return false;
            }

            var srcList = getStorageArray(storage[src]);
            var targetList = getStorageArray(storage[target]);

            var index = srcList.indexOf(taskName);
            srcList.splice(index, 1);

            targetList.push(taskName);

            setStorageArray(storage[src], srcList);
            setStorageArray(storage[target], targetList);
        }

        /**
         * Removes task from list
         *
         * @param {string} taskName
         * @param {string} src
         */
        function removeTask(taskName, src){
            var srcList = getStorageArray(storage[src]);

            var index = srcList.indexOf(taskName);
            srcList.splice(index, 1);

            setStorageArray(storage[src], srcList);
        }

        /**
         * can be removed
         * @param taskName
         */
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

        $(function () {
            init();
        });

        return {
            addTask: addNewTask,
            moveTaskToProgres: moveTaskToProgres,
            moveTaskToDone: moveTaskToDone,
            moveTask: moveTask,
            removeTask: removeTask,
            getAllDoneTasks: getAllDoneTasks,
            getAllInProgressTasks: getAllInProgressTasks,
            getAllToDoTasks: getAllToDoTasks
        };
    }());
}(jQuery, window.localStorage));
