// get the tasks in local storage. If no tasks return empty array
let taskList = [];
let nextId = 1;


function getTasks() {
  const existingTasks = JSON.parse(localStorage.getItem("tasks"))||[];
  // If tasks were retrieved from localStorage, update the tasks array to this data, if not, leave the empty array
  if ((existingTasks !== null)||(existingTasks !== 'undefined')) {
    //this will update taskList variable with the most recent data from local storage
    taskList = existingTasks;
    console.log(taskList);
  }
}


// Todo: create a function to generate a unique task id
function generateTaskId() {
  // i was going to use the uniqueId() but did this simple method instead.
  // get the last number used as an id (from local storage)
  // it has an initial value of 1
  
  let CurrentIdNum = localStorage.getItem("nextId");
  // create the nextId # and put assign it to the variable
  if (CurrentIdNum !== "undefined") {
    nextId = Number(CurrentIdNum) + 1;
    // store this number in local storage
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return nextId;
  } else {
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return nextId;
  }
}



// Todo: create a function to handle adding a new task
// this is done when new task button is clicked
// task needs to be added to the object in local storage


function handleAddTask(event) {
  event.preventDefault();
  console.log('clicked');

  getTasks();

  const taskTitle = $('input[name="title"]').val().trim();
  const taskDescript = $('input[name="description"]').val().trim();
  const taskDate = $('input[name="date"]').val().trim();

  // if no data in some fields return a pop up advising to enter valid info
  if ((taskTitle === "") || (taskDescript === "") || (taskDate === "")) {
    alert("enter valid content");

  } else {

    generateTaskId();
 
    const taskNumber = nextId;

    // create an object from the data

    taskList[taskList.length] = { tTitle: taskTitle, tDescription: taskDescript, tDate: taskDate, tNumber: taskNumber, tStatus: "to-do" };
    console.log(taskList);


    // store this new object in local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));



    // clear the fields and close the modal window
    $('input[name="title"]').val(" ");
    $('input[name="description"]').val(" ");
    $('input[name="date"]').val(" ");
    $("#exampleModal").modal("hide");

    // render the updated list
    // activate the delete button

    renderTaskList();
  }
}




// Todo: create a function to create a task card
function createTaskCard(task) {
  // creates a card for each object passed in

  let card = $('<div>');
  card.attr("class", 'card draggable');
  card.attr("id", task.tNumber);  // assign the task number as the id of the card
  //puts a dataset on it. stored on the element
  card.attr("data-id", task.tNumber);
  card.attr("status", task.tStatus);

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

  // if the task is done make it white
  if (task.tStatus === "done") {
    card.attr('style', 'width:80; align-items: center; background-color: lightgrey; margin: 3px');
  }
  else if (daysBetween < 0) {
    card.attr('style', 'width:80; align-items: center; background-color: red; margin: 3px');
  } else if (daysBetween < 3) {
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



// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  // store as a data id as an attr
  const taskId = ui.draggable[0].dataset.id;
  console.log(taskId);

  const newStatus = event.target.id; //this is the lanes id on the html 
  getTasks();

  //this code goes through the list of stored items to find the id of the item
  //we moved and it changes only that item's status
  for (let task of taskList) {
    console.log(task);
    console.log(task.tNumber);
    //add number here
    if (Number(task.tNumber) === Number(taskId)) {
      task.tStatus = newStatus;
    }
  }
  // update the local storage 
  localStorage.setItem('tasks', JSON.stringify(taskList));
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
  getTasks();

  let updatedTaskList = [];
  for (let i = 0; i < taskList.length; i++) {
    if ((Number(taskList[i].tNumber)) === itemDeleted) {
      console.log("this item got deleted" + itemDeleted);
    } else
      updatedTaskList.push(taskList[i])
  }

  localStorage.setItem('tasks', JSON.stringify(updatedTaskList));

  //to clear the old list and re-render with the new addition
  renderTaskList();
}


function renderTaskList() {

  // get the task list
  getTasks();

  // need to get the 3 possible columns to post the card to. 
  const cardTodo = $("#todo-cards");  // holder for the new card
  const cardInprogress = $("#in-progress-cards");  // holder for the new card
  const cardDone = $("#done-cards");  // holder for the new card

  // clear the cards to start
  cardTodo.empty();
  cardInprogress.empty();
  cardDone.empty();

  for (let i = 0; i < taskList.length; i++) {
    console.log(taskList[i]);
    let cardNew = createTaskCard(taskList[i]);  //send whole object over to be a card
    console.log(cardNew);
    let cardStatus = cardNew[0].attributes[3].nodeValue;
    console.log("this is the status" + cardStatus)
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


    $(".draggable").draggable({
      opacity: 0.7, zIndex: 100,
      helper: function (e) {
        // check if the target of the drag event is the card itself
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('ui-draggable');
        return original.clone().css({
          maxWidth: original.outerWidth(),
        })
      },
    })
  }

}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  // do the set up tasks
  
  getTasks();
  // Retrieve tasks and nextId from localStorage

  console.log(taskList);

  renderTaskList();


  // get the buttons
  let addTaskBtn = $('#addTask');
  let addDeleteBtn = $('.deleteBtn');

  // listen for the add task button to be clicked
  addTaskBtn.on('click', handleAddTask);
  addDeleteBtn.on('click', handleDeleteTask);


  //make the lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });


  //adds function for the datepicker
  $(function () {
    $("#datepicker").datepicker();
  });


});

