// Retrieve tasks and nextId from localStorage
let taskList =  []; //JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let addTaskBtn = $('#addTask');

//adds function for the datepicker
$( function() {
  $( "#datepicker" ).datepicker();
} );


// Todo: create a function to generate a unique task id
function generateTaskId() {
  // placeholder to use an Id...not sure how to use this yet.
  // this will become part of the object of the task somehow
  // this will be applied when the card is created not stored with the cards 
  // so I will use it when I import and create the cards. This makes sense so it is done on the live feed not the stored feed so we can be sure they are unique. But it will have to be done each time a card is created.
  this.uniqueId();
}


// Todo: create a function to create a task card
function createTaskCard() {
 
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
// this is done when new task button is clicked
// task needs to be added to the object in local storage
function handleAddTask(event){
  event.preventDefault();
  console.log('clicked');
  
  const taskTitle = $('input[name="title"]').val();
  const taskDescript = $('input[name="description"]').val();
  const taskDate = $('input[name="date"]').val();
  

  // create an object from the data

  
  if (taskList.length === 0) {
    taskList[0] = {tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate, tId: generateTaskId};
  } else {
    employeesArray[employeesArray.length] = {tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate};
    }
  
    console.log(taskList);
    // store this new object in local storage


  // if (!taskTitle) {
  //   console.log('No shopping item filled out in form!');
  //   return;


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
// listen for the add task button to be clicked
addTaskBtn.on('click', handleAddTask);

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

