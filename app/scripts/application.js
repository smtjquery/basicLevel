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
	  
	// public methods
		
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
	  		
	// public methods
	
	// private methods
	  
	function showAllTasks() {
		updateTodoView();			
		updateProgressView();
		updateDoneView();
		
		initTodoTiles();
		initInProgressTiles();
	}
	
	function initButtons() {
		$("#new-task-button").click(function(){
			App.module.application.addNewTask($("#new-task-input"));
		});
		
		$("#delete-tasks-button").click(function(){
			App.module.application.removeAllTasks();
		});
	}
	
	function initTodoTiles() {
		var todoTiles = $(".todo");

		$.each(todoTiles, function(index, element){
			var taskName = $(element).attr("data-taskName");
			var link = $(element).find("a");
			$(link).click(function(){
				App.module.application.moveTaskToProgres(taskName);
			});
		});
	}
	
	function initInProgressTiles() {
		var todoTiles = $(".inProgress");

		$.each(todoTiles, function(index, element){
			var taskName = $(element).attr("data-taskName");
			var link = $(element).find("a");
			$(link).click(function(){
				App.module.application.moveTaskToDone(taskName);
			});
		});
	}
	
	function updateTodoView() {
		var todoList = $("#todoList");
		var elementsToShow = service.getAllToDoTasks();
		var taskName;
		var html='';
		
		$.each(elementsToShow, function(index, value) {
			html+='<div class="todo task" data-taskName=' + value + '><div class="title">' + value + '</div><div class="actions"><span>Actions:</span><a href="#" >move to progress</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
		});

		todoList.html(html);
	}
		
	function updateProgressView() {
		var inProgressList = $("#inProgressList");
		var elementsToShow = service.getAllInProgressTasks();
		var taskName;
		var html='';
		
		$.each(elementsToShow, function(index, value) {
			html+='<div class="inProgress task" data-taskName=' + value + '><div class="title">' + value + '</div><div class="actions"><span>Actions:</span><a href="#">move to done</a></div><div class="close glyphicon glyphicon-remove"></div></div>';
		});
		
		inProgressList.html(html);			      
	}
	
	function updateDoneView() {
		var doneList = $("#doneList");
		var elementsToShow = service.getAllDoneTasks();
		var taskName;
		var html='';			
	
		$.each(elementsToShow, function(index, value) {
			html+='<div class="task" data-taskName=' + value + '><div class="title">' + value + '</div><div class="close glyphicon glyphicon-remove"></div></div>';
		});
		
		doneList.html(html);
	}		
	
	// private methods

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
		initButtons();			
    });

    return {
		removeAllTasks: removeAllTasks,
		addNewTask: addNewTask,
		moveTaskToProgres: moveTaskToProgres,
		moveTaskToDone: moveTaskToDone
	};

  }());

}(jQuery, App.module.service));