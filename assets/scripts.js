// Retrieve tasks and nextId from localStorage

const existingTasks = JSON.parse(localStorage.getItem("tasks"));

// If tasks were retrieved from localStorage, update the tasks array to it if not, leave the empty array
let taskList = [];
if (existingTasks !== null) {
  taskList = existingTasks;
}

console.log('what is in storage: ' + taskList);

// set up tasks
let nextId = 1;
let addTaskBtn = $('#addTask');


//adds function for the datepicker
$(function () {
  $("#datepicker").datepicker();
});


// Todo: create a function to generate a unique task id
function generateTaskId(next) {
  // i was going to use the uniqueId() but did this simple method instead.
  
  // get the last number used as an id (from local storage)
  // it has an initial value of 1
  nextId = Number(JSON.parse(localStorage.getItem("nextId")));
  // create the nextId # and put assign it to the variable
  nextId = nextId + 1;
  // store this number in local storage
  localStorage.setItem('nextId', JSON.stringify(nextId));
}


// Todo: create a function to create a task card
function createTaskCard() {
  // I will have to render a card.....here is the html to think about the bootstrap.
  //   <div class="todo-cards"></div>  // I'll need to get this 
  const cardHolder = $("#todo-cards");  // holder for the new card
  // create the new card and set its class to card
  let card = $('<div>');
  card.attr("class", 'card');

  // create the card-body and give it a class card-body
  let cardBody = $('<div>');
  cardBody.attr("class", 'cardBody');
  cardBody.attr('style', 'width:80; align-items: center');
  
  //     <h5 class="card-title">Card title</h5>
  let cardTitle = $('<h5>');
  cardTitle.attr("class", 'cardTitle');
  cardTitle.text("hello world");

  //     create the p tag for the description
  let cardDescription = $('<p>');
  cardDescription.attr("class", 'cardDescription');
  cardDescription.text("here's the description of the task");
  
  //     create the delete button class="btn btn-primary">Delete</a>
  let cardDelete = $('<button>');
  cardDelete.attr("class", 'btn btn-primary');
  cardDelete.attr("id", 'deleteBtn');
  cardDelete.text("delete");

  // put it all together
  card.append(cardTitle);
  card.append(cardDescription);
  card.append(cardDelete);
  cardHolder.append(card);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

  createTaskCard();

}

// Todo: create a function to handle adding a new task
// this is done when new task button is clicked
// task needs to be added to the object in local storage
function handleAddTask(event) {
  event.preventDefault();
  console.log('clicked');

  const taskTitle = $('input[name="title"]').val().trim();
  const taskDescript = $('input[name="description"]').val().trim();
  const taskDate = $('input[name="date"]').val().trim();
  generateTaskId();
  const taskNumber = nextId;
  


  // create an object from the data
  if (taskList[0] === null) {
    taskList[0] = {tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate, tNumber: taskNumber, tStatus: "toDo"};
    console.log(taskList);
  } else {
    taskList[taskList.length] = {tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate, tNumber: taskNumber, tStatus: "toDo"};
    console.log(taskList);
  }

  // store this new object in local storage
  localStorage.setItem('tasks', JSON.stringify(taskList));

  // if (!taskTitle) {
  //   console.log('No shopping item filled out in form!');
  //   return;

  // clear the fields and close the modal window
  $('input[name="title"]').val(" ");
  $('input[name="description"]').val(" ");
  $('input[name="date"]').val(" ");
  $("#exampleModal").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // listen for the add task button to be clicked
  addTaskBtn.on('click', handleAddTask);
  renderTaskList();


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

