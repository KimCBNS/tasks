// Retrieve tasks and nextId from localStorage
const existingTasks = JSON.parse(localStorage.getItem("tasks"));

// If tasks were retrieved from localStorage, update the tasks array to this data, if not, leave the empty array
let taskList = [];
if (existingTasks !== null) {
  taskList = existingTasks;
}



// do the set up tasks
let nextId = 1;
let addTaskBtn = $('#addTask');
let addDeleteBtn = $('.deleteBtn');


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
  return nextId;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
  // creates a card for each object passed in

  let card = $('<div>');
  card.attr("class", 'card draggable');
  card.attr("id", task.tNumber);  // assign the task number as the id of the card
  //puts a dataset on it. stored on the element
  card.attr("data-id", task.tNumber);
  card.attr("status", "to-do");

  // create the card-body and give it a class card-body
  let cardBody = $('<div>');
  cardBody.attr("class", 'cardBody');

  // <h5 class="card-title">Card title</h5>
  let cardTitle = $('<h5>');
  cardTitle.attr("class", 'cardTitle');
  cardTitle.text(task.tTitle);

  //  create the p tag for the description
  let cardDescription = $('<p>');
  cardDescription.attr("class", 'cardDescription');
  cardDescription.text(task.tDescription);

  // create the p tag for the date (made it a string)
  let cardDate = $('<p>');
  cardDate.attr("class", 'cardDate');
  cardDate.text(task.tDate);
  /* here is where we determine the difference between due date and today's date get today's date, get the due date, find the difference. If overdue 
  make the card red, if close to due date, make the card yellow, else make it white.*/



  // days.js calculate the days between
  // dayjs object for May 4, 2027
  const DueDate = dayjs(task.tDate);

  // dayjs object for today
  const todayDate = dayjs();

  // number of days between targetDay and today
  const daysBetween = DueDate.diff(todayDate, 'days');

  if (daysBetween <= 0) {
    card.attr('style', 'width:80; align-items: center; background-color: red; margin: 3px');
  } else if (daysBetween < 5) {
    card.attr('style', 'width:80; align-items: center; background-color: yellow; margin: 3px');
  } else {
    card.attr('style', 'width:80; align-items: center; background-color: white; margin: 3px');
  }


  //  create the delete button class="btn btn-primary">Delete</a>
  let cardDelete = $('<button>');
  cardDelete.attr("class", 'btn btn-primary deleteBtn');
  cardDelete.attr("id", task.tNumber);
  cardDelete.text("delete");

  // put it all together and build the card
  card.append(cardTitle);
  card.append(cardDescription);
  card.append(cardDate);
  card.append(cardDelete);
  console.log('made a card');

  return card;



}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  let tasksToRender = [];
  tasksToRender = JSON.parse(localStorage.getItem("tasks"));
 console.log(tasksToRender.length);
 

  // need to get the 3 possible columns to post the card to. 
  const cardTodo = $("#todo-cards");  // holder for the new card
  const cardInprogress = $("#in-progress-cards");  // holder for the new card
  const cardDone = $("#done-cards");  // holder for the new card

  // clear the cards to start
  cardTodo.empty();
  cardInprogress.empty();
  cardDone.empty();

  for (let i = 0; i < tasksToRender.length; i++) {
    let cardNew = createTaskCard(tasksToRender[i]);  //send whole object over to be a card
    console.log(cardNew);
    let cardStatus = cardNew[0].attributes[3].nodeValue;
    
    if (cardStatus === 'to-do') {
      cardTodo.append(cardNew);
    }
    else if (cardStatus === 'in-progress') {
      cardInprogress.append(cardNew);
    }
    else {
      cardDone.append(cardNew);
    }

    addDeleteBtn = $('.deleteBtn');
    addDeleteBtn.on('click', handleDeleteTask);


     $(".draggable").draggable({ opacity: 0.7, zIndex: 100 });
   
  }

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
    taskList[0] = { tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate, tNumber: taskNumber, tStatus: "to-do" };
    console.log(taskList);
  } else {
    taskList[taskList.length] = { tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate, tNumber: taskNumber, tStatus: "to-do" };
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

  //location.reload(); //to clear the old list and re-render with the new addition

  // render the updated list
  // activate the delete button

  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  console.log('delete clicked');
  // capture the id of the item to be deleted
  //get the items from local storage...remove the one with that Id
  //reset the local storage
  // rerender the list without the removed item
  let itemDeleted = Number(this.id);
  //get the task list
  let tasksMemory = [];
  tasksMemory = JSON.parse(localStorage.getItem("tasks"));


  let updatedTaskList = [];
  for (let i = 0; i < tasksMemory.length; i++) {
    if ((Number(tasksMemory[i].tNumber)) === itemDeleted) {
      console.log("this item got deleted" + itemDeleted);
    } else
      updatedTaskList.push(tasksMemory[i])
  }

   localStorage.setItem('tasks', JSON.stringify(updatedTaskList));

  //to clear the old list and re-render with the new addition
  renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // store as a data id as an attr
  const taskId = ui.draggable[0].dataset.id;
  const newStatus = event.target.id;

  for (let task of taskList) {
    if (task.tNumber === Number(taskId)) {
      task.tStatus = newStatus;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // listen for the add task button to be clicked
  addTaskBtn.on('click', handleAddTask);
  addDeleteBtn.on('click', handleDeleteTask);
  renderTaskList();




  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
    drop: function( event, ui ) {
    console.log('dropped');
    $( this )
      .addClass( "ui-state-highlight" );
  }
  });



  
});





