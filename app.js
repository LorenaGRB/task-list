//TASK LIST PROJECT

//Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector("#filter");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

function loadTask() {
  let taskGroup;
  if ( localStorage.getItem("taskGroup") === null ) {
    taskGroup = [];
  } else {
    taskGroup = JSON.parse( localStorage.getItem("taskGroup") );
  }
  taskGroup.forEach(function (task) {
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className  = 'collection-item';
    //Create text node
    const textNode=document.createTextNode(task);
    //Append text node to li
    li.appendChild(textNode);
    //Create a link element
    const link = document.createElement('a');
    //Create a className
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
    //Apend li to ul
    taskList.appendChild(li);
    }
  );

};

// Save in local storage
function storeTaskInLocalStorage (taskInputValue){
  let taskGroup;
  
  if ( localStorage.getItem('taskGroup') === null) {
    taskGroup = [];

  } else {
   taskGroup = JSON.parse(localStorage.getItem('taskGroup'));

  };

   taskGroup.push(taskInputValue);
  
   localStorage.setItem('taskGroup',JSON.stringify(taskGroup));

};

//Add Task
function addTask(e){
  if (taskInput.value === '') {
    alert('Add a task');
  } else {

  //Create li element
  const li = document.createElement('li');
  //Add class
  li.className  = 'collection-item';
  //Create text node
  const textNode=document.createTextNode(taskInput.value);
  //Append text node to li
  li.appendChild(textNode);

  //Create a link element
  const link = document.createElement('a');
  //Create a className
  link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class= "fa fa-remove"></i>';
  //Append link to li
  li.appendChild(link);

  //Apend li to ul
  taskList.appendChild(li);

  //local storage
  storeTaskInLocalStorage(taskInput.value);

  //ClearInput aferter addthe task
  taskInput.value = '';

  e.preventDefault();
  };
};

function removeFromLocalStorage(taskItem) {
  let taskGroup;
  if ( localStorage.getItem("taskGroup") === null ) {
    taskGroup = [];
  } else {
    taskGroup = JSON.parse(localStorage.getItem("taskGroup"));
  }
  
  taskGroup.forEach((task,index) => {
    if (taskItem.textContent === task) {
      taskGroup.splice(index,1);
    }
  });

  localStorage.setItem('taskGroup',JSON.stringify(taskGroup));
}


function removeTask(e) {
 if(e.target.parentElement.classList.contains('delete-item')) {
  if (confirm("Do you want to remove the task?")) {
    e.target.parentElement.parentElement.remove();

    //Remove from LS
    removeFromLocalStorage( e.target.parentElement.parentElement );
  };
 };

};

function clearTasksFromLocalStorage() {
  localStorage.clear();

}
function removeTasks(e) {

  //one way
    //taskList.innerHTML=null;

  //faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  };
  clearTasksFromLocalStorage();
};

function filterTask(e) {
  const filter = e.target.value;
  document.querySelectorAll('.collection-item').forEach(element => {
    const item = element.firstChild.textContent;
    if( item.indexOf(filter) != -1 ){
      element.style.display = 'block';
    }else{
      element.style.display = 'none';
    }
  });
    
  
}

//Load all event listeners
function loadEventListeners(){
  //Add task event
  form.addEventListener('submit',addTask);
  //Remove a task
  taskList.addEventListener('click',removeTask);
  //Clear tasks
  clearBtn.addEventListener('click',removeTasks);
  //Filter
  filter.addEventListener('keyup',filterTask);
  // Load in local storage
  document.addEventListener('DOMContentLoaded',loadTask);
};


//main

loadEventListeners();