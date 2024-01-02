//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.querySelector('#new-task');
const addNewTaskButton = document.querySelector('.button_type_add');
const incompleteTaskHolder = document.querySelector('#incomplete-tasks');
const completedTasksHolder = document.querySelector('#completed-tasks');

//New task list item
function createNewTaskElement(taskString) {

  const listItem = document.createElement('li');
  listItem.className = 'task';

  //input (checkbox)
  const checkBox = document.createElement('input');
  //label
  const label = document.createElement('label');
  //input (text)
  const editInput = document.createElement('input');
  //button.edit
  const editButton = document.createElement('button');

  //button.delete
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task__label';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkbox';
  editInput.type = 'text';
  editInput.className = 'task__input';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'button button_type_edit';

  deleteButton.className = 'button button_type_delete';
  deleteButtonImg.className = 'button__icon';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete icon';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



function addTask() {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = '';
}

//Edit an existing task.

function editTask() {
  console.log('Edit Task...');
  console.log(`Change 'edit' to 'save'`);

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector('.task__label');
  const editBtn = listItem.querySelector('.button_type_edit');
  const containsClass = editInput.classList.contains('task__input_edit-mode');
  //If class of the parent is .task-list__item_edit-mode
  if (containsClass) {
      //switch to .task-list__item_edit-mode
      //label becomes the inputs value.
      label.innerText = editInput.value;
      editBtn.innerText = 'Edit';
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = 'Save';
  }

  //toggle .task-list__item_edit-mode on the parent.
  editInput.classList.toggle('task__input_edit-mode');
  label.classList.toggle('task__label_edit-mode');
};


//Delete task.
function deleteTask() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
function taskCompleted() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  const label = listItem.querySelector('.task__label');
  label.classList.add('task__label_completed');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


function taskIncomplete() {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  const listItem = this.parentNode;
  const label = listItem.querySelector('.task__label');
  label.classList.remove('task__label_completed');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}



function ajaxRequest() {
  console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
//addNewTaskButton.onclick = addTask;
addNewTaskButton.addEventListener('click', addTask);
addNewTaskButton.addEventListener('click', ajaxRequest);


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  const checkBox = taskListItem.querySelector('.task__checkbox');
  const editButton = taskListItem.querySelector('.button_type_edit');
  const deleteButton = taskListItem.querySelector('.button_type_delete');


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items children(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.