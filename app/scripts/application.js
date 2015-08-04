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
    var toDoTasksListDomElement;
    var inProgressTasksListDomElement;
    var doneTasksListElement;

    var tasks = {
      'toDo': 'toDo',
      'inProgress': 'inProgress',
      'done': 'done'
    };

    /**
     * Initialize application
     *
     * @private
     */
    function init() {
      initializeToDoTasksListDomElement();
      initializeInProgressTasksListDomElement();
      initializeDoneTasksListDomElement();

      showAllTasks();

      initializeAddingNewTasks();
      initializeMovingTaskToProgressList();
      initializeMovingTaskToDoneList();
    }

    function initializeToDoTasksListDomElement() {
      toDoTasksListDomElement = $('#toDoTasksList');
    }

    function initializeInProgressTasksListDomElement() {
      inProgressTasksListDomElement = $('#inProgressTasksList');
    }

    function initializeDoneTasksListDomElement() {
      doneTasksListElement = $('#doneTasksList');
    }

    function showAllTasks() {
      updateToDoTaskListDomElement();
      updateInProgressTaskListDomElement();
      updateDoneTaskListDomElement();
    }

    function updateToDoTaskListDomElement() {
      var tasksNames = service.getAllToDoTasks();

      updateTaskList(tasksNames, toDoTasksListDomElement, tasks.toDo)
    }

    function updateInProgressTaskListDomElement() {
      var tasksNames = service.getAllInProgressTasks();

      updateTaskList(tasksNames, inProgressTasksListDomElement, tasks.inProgress)
    }

    function updateDoneTaskListDomElement() {
      var tasksNames = service.getAllDoneTasks();

      updateTaskList(tasksNames, doneTasksListElement, tasks.done)
    }

    function updateTaskList(tasksNames, listDomElement, kindOfTask) {
      var tasksList = "";
      var action = "";

      switch (kindOfTask) {
        case tasks.toDo:
          action = "move to progress";
          break;
        case tasks.inProgress:
          action = "move to done";
          break;
        case tasks.done:
          action = "";
          break;
      }

      tasksList = buildTaskList(tasksNames, action);
      listDomElement.html(tasksList);
    }

    function buildTaskList(tasksNames, action) {
      var taskName;
      var tasksHTMLElement = "";

      for (taskName in tasksNames) {
        tasksHTMLElement += buildTaskListDomElement(tasksNames[taskName], action);
      }

      return tasksHTMLElement;
    }

    function buildTaskListDomElement(taskName, action) {
      var actionHtml;

      if (action) {
        actionHtml =
            '<div class="actions">' +
            '<span>Actions:</span>' +
            '<a href="#">' +
            action +
            '</a>' +
            '</div>';
      } else {
        actionHtml = "";
      }

      var singleTaskTemplate =
          '<div class="task">' +
          '<div class="title">' +
          taskName +
          '</div>' +
          actionHtml +
          '<div class="close glyphicon glyphicon-remove"></div>' +
          '</div>';

      return singleTaskTemplate;
    }

    function initializeAddingNewTasks() {
      $('button#create-task').click(function () {
        var newTaskName = $('input#new-task').val();

        if (newTaskName) {
          addNewTask(newTaskName);
          showAllTasks();
        } else {
          alert("You need to type task's name");
        }
      });
    }

    function initializeMovingTaskToProgressList() {
      toDoTasksListDomElement.on('click', 'a', function () {
        var currentTask = $(this).parent().parent().find('.title').text();
        moveToProgres(currentTask);
        updateToDoTaskListDomElement();
        updateInProgressTaskListDomElement();
      })
    }

    function initializeMovingTaskToDoneList() {
      inProgressTasksListDomElement.on('click', 'a', function () {
        var currentTask = $(this).parent().parent().find('.title').text();
        moveToDone(currentTask);
        updateInProgressTaskListDomElement();
        updateDoneTaskListDomElement();
      })
    }

    function addNewTask(taskName) {
      if (taskName) {
        service.addTask(taskName);
      }
    }

    function moveToProgres(taskName) {
      if (taskName) {
        service.moveTaskToProgres(taskName);
      }
    }

    function moveToDone(taskName) {
      if (taskName) {
        service.moveTaskToDone(taskName);
      }
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

  }());

}(jQuery, App.module.service));