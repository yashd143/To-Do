// Get DOM elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const activeTasksContainer = document.querySelector(".active-tasks");
const completedTasksContainer = document.querySelector(".completed-tasks");

let tasks = [];
let taskId = 1;

// Event listeners
todoButton.addEventListener("click", addTask);
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

activeTasksContainer.addEventListener("click", handleTaskAction);
completedTasksContainer.addEventListener("click", handleTaskAction);

// Add a new task
function addTask() {
  const taskName = todoInput.value.trim();

  if (taskName === "") {
    return;
  }

  const newTask = {
    id: taskId,
    name: capitalizeFirstLetter(taskName),
    completed: false,
  };

  tasks.push(newTask);
  renderTasks();

  todoInput.value = "";
  taskId++;
}

// Handle task actions (complete/undo/delete)
function handleTaskAction(event) {
  const target = event.target;
  const taskId = parseInt(target.dataset.taskId);

  if (target.classList.contains("complete-button")) {
    completeTask(taskId);
  } else if (target.classList.contains("undo-button")) {
    undoTask(taskId);
  } else if (target.classList.contains("delete-button")) {
    deleteTask(taskId);
  }
}

// Complete a task
function completeTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.completed = true;
    renderTasks();
  }
}

// Undo a completed task
function undoTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.completed = false;
    renderTasks();
  }
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Render tasks
function renderTasks() {
  activeTasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskRow = document.createElement("tr");

    const taskIdCell = document.createElement("td");
    taskIdCell.innerText = task.id;
    taskRow.appendChild(taskIdCell);

    const taskNameCell = document.createElement("td");
    taskNameCell.innerText = task.name;
    taskRow.appendChild(taskNameCell);

    const actionsCell = document.createElement("td");
    if (task.completed) {
      const undoButton = createUndoButton(task.id);
      actionsCell.appendChild(undoButton);
    } else {
      const completeButton = createCompleteButton(task.id);
      const deleteButton = createDeleteButton(task.id);
      actionsCell.appendChild(completeButton);
      actionsCell.appendChild(deleteButton);
    }
    taskRow.appendChild(actionsCell);

    if (task.completed) {
      completedTasksContainer.appendChild(taskRow);
    } else {
      activeTasksContainer.appendChild(taskRow);
    }
  });
}

// Create complete button
function createCompleteButton(taskId) {
  const completeButton = document.createElement("button");
  completeButton.innerText = "Complete";
  completeButton.classList.add("complete-button");
  completeButton.setAttribute("data-task-id", taskId);
  return completeButton;
}

// Create undo button
function createUndoButton(taskId) {
  const undoButton = document.createElement("button");
  undoButton.innerText = "Undo";
  undoButton.classList.add("undo-button");
  undoButton.setAttribute("data-task-id", taskId);
  return undoButton;
}

// Create delete button
function createDeleteButton(taskId) {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("data-task-id", taskId);
  return deleteButton;
}

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
