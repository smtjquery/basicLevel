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
	  
	  function removeAllTasks() 
	  {
		service.removeAllTasks();
		showAllTasks();
	  }
	  
	  function addNewTask(taskName) {
		  var name=taskName.val();		  
		  service.addTask(name);
		  taskName.val("");
		  showAllTasks();
	  }	  
	  
	  function moveTaskToDone(taskName) {	  
		  service.moveTaskToDone(taskName);
		  showAllTasks();
	  }
	  
	  function moveTaskToProgres(taskName) {
		  service.moveTaskToProgres(taskName);
		  showAllTasks();
	  }	  
	  
	function showAllTasks() {
		updateTodoView();			
		updateProgressView();
		updateDoneView();
	}
	
	function updateTodoView() {
		var todoList = $("#todoList");
		var elementsToShow = service.getAllToDoTasks();
		var taskName;
		var html='';
		
		$.each(elementsToShow, function(index, value) {
			html+='<div class="task" draggable="true" data-taskName=' + value + '><div class="title">' + value + '</div><div class="actions"><span>Actions:</span><a href="#" onclick=App.module.application.moveTaskToProgres("' + value + '")>move to progress</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
		});

		todoList.html(html);
	}
	
	function updateProgressView() {
		var inProgressList = $("#inProgressList");
		var elementsToShow = service.getAllInProgressTasks();
		var taskName;
		var html='';
		
		$.each(elementsToShow, function(index, value) {
			html+='<div class="task" draggable="true" data-taskName=' + value + '><div class="title">' + value + '</div><div class="actions"><span>Actions:</span><a href="#" onclick=App.module.application.moveTaskToDone("' + value + '")>move to done</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
		});
		
		inProgressList.html(html);			      
	}
	
	function updateDoneView() {
		var doneList = $("#doneList");
		var elementsToShow = service.getAllDoneTasks();
		var taskName;
		var html='';			
	
		$.each(elementsToShow, function(index, value) {
			html+='<div class="task" draggable="true" data-taskName=' + value + '><div class="title">' + value + '</div><div class="close glyphicon glyphicon-remove"></div></div>';
		});
		
		doneList.html(html);
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
	  service.init();
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