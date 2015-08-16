(function ($, localStorage) {
    'use strict';

    App.module.service = (function () {

		// public methods
		
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

       	function removeAllTasks()
		{
			localStorage.clear();
			location.reload();
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
		
		// public methods
		
		// private methods
		
		function getStorageArray(storageName){
            return JSON.parse(localStorage[storageName]);
        }

        function setStorageArray(storageName, obj){
            localStorage[storageName] = JSON.stringify(obj);
        }
		
		
		// private methods

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
			init: init,
            addTask: addNewTask,
            moveTaskToProgres: moveTaskToProgres,
            moveTaskToDone: moveTaskToDone,   
			getAllDoneTasks: getAllDoneTasks,
			getAllInProgressTasks: getAllInProgressTasks,
			getAllToDoTasks: getAllToDoTasks,     
			removeAllTasks: removeAllTasks
        };
    }());
}(jQuery, window.localStorage));