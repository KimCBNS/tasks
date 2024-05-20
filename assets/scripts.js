// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//listen for the button to add a task



// Todo: create a function to generate a unique task id
function generateTaskId() {
  // placeholder to use an Id...not sure how to use this yet.
  
  const newTaskId = $('<h1>').uniqueId();

}


// Todo: create a function to create a task card
// this should be first
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});



// testing area == adds to the page
// const rootEl = document.getElementById("root");
// const rootEl = $('#test');
// const titleEl = $('<h1>').uniqueId();
// titleEl.text('hello');
// rootEl.append(titleEl);

// const title2 = $('<h1>').uniqueId();
// title2.text('goodbye');
// rootEl.append(title2);

