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
	  
	  function removeAllTasks() {
		App.module.service.removeAllTasks();
		showAllTasks();
	  }
	  
	  function addNewTask(taskName) {
		  var name=taskName.value;		  
		  App.module.service.addTask(name);
		  taskName.value='';
		  showAllTasks();
	  }	  
	  
	  function moveTaskToDone(taskName){	  
		  App.module.service.moveTaskToDone(taskName);
		  showAllTasks();
	  }
	  
	  function moveTaskToProgres(taskName){
		  App.module.service.moveTaskToProgres(taskName);
		  showAllTasks();
	  }
	  
	  
		function showAllTasks()
		{
			updateTodoView();			
			updateProgressView();
			updateDoneView();
		}
		
		function updateTodoView()
		{
			var todoList = document.getElementById("todoList");
			var elementsToShow = App.module.service.getAllToDoTasks();
			var taskName;
			var html='';
			
			for (var i = 0, len = elementsToShow.length; i < len; i++) {
			  taskName = elementsToShow[i];
			  
			  html+='<div class="task"><div class="title">' + taskName + '</div><div class="actions"><span>Actions:</span><a href="#" onclick=App.module.application.moveTaskToProgres("' + taskName + '")>move to progress</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
			}

			todoList.innerHTML = html;
		}
		
		function updateProgressView()
		{
			var inProgressList = document.getElementById("inProgressList");
			var elementsToShow = App.module.service.getAllInProgressTasks();
			var taskName;
			var html='';
			
			for (var i = 0, len = elementsToShow.length; i < len; i++) {
			  taskName = elementsToShow[i];
			  
			  html+='<div class="task"><div class="title">' + taskName + '</div><div class="actions"><span>Actions:</span><a href="#" onclick=App.module.application.moveTaskToDone("' + taskName + '")>move to done</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
			}

			inProgressList.innerHTML = html;			      
		}
		
		function updateDoneView()
		{
			var doneList = document.getElementById("doneList");
			var elementsToShow = App.module.service.getAllDoneTasks();
			var taskName;
			var html='';
			
			for (var i = 0, len = elementsToShow.length; i < len; i++) {
			  taskName = elementsToShow[i];
			  
			  html+='<div class="task"><div class="title">' + taskName + '</div><div class="close glyphicon glyphicon-remove"></div></div>';
			}

			doneList.innerHTML = html;
		}
		

    /**
     * Initialize application
     *
     * @private
     */
    function init() {}

    /**
     * Run init when browser is ready.
     *
     * @private
     */
    $(function () {
      init();
	  App.module.service.init();
	  showAllTasks();
    });

    return {
		removeAllTasks: removeAllTasks,
		addNewTask: addNewTask,
		moveTaskToProgres: moveTaskToProgres,
		moveTaskToDone: moveTaskToDone
	};

  }());

}(jQuery, App.module.service));