# TODO list - jQuery workshop

Description goes here

## Easy install

You don't need any dependencies to develop this project, but I've prepared small gulp file
which will help you serve and on-demand-reload any files within this project on any browser.

If you want to use gulp there are few steps to achieve that:
 * install node.js from https://nodejs.org/
 * add gulp ```npm i -g gulp```
 * make sure youre inside this project and install all dependencies using ```npm i```

To run server type ```gulp develop```

## What needs to be done!

Your main task is to finish existing code to a fully functional TODO list app.

 * Implement new method ```addNewTask``` that will be called after user clicks on "Create" button. This method should be able to create new task entity, render it on list and save inside localStorage.
 * Implement new method ```moveToProgress``` that is bound to each task in "to do" section. This method should be able to (as name suggests) move current task from "to do" to "progress" section. As well remeber to save it inside localStorage.
 * Implement new method ```moveToDone``` that is bound to each task in "progress" section. This method should be able to (as name suggests) move current task from "progress" to "done" section. Again remeber to save it inside localStorage.
 * Implement new method ```showAllTasks``` that will load all previously saved tasks and displays them on screen in proper order.

### Challenge

![alt tag](http://blog.amhill.net/wp-content/uploads/2011/05/challenge-accepted-300x244.png)

 * Implement drag & drop to move current task to any section you want :)
