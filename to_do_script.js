document.addEventListener("DOMContentLoaded", function() {
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const activeTasksContainer = document.querySelector(".active-tasks");
  const completedTasksContainer = document.querySelector(".completed-tasks");

  let taskId = 1; // Counter for task IDs

  todoButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  activeTasksContainer.addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("complete-checkbox")) {
      const taskItem = target.closest("tr");
      taskItem.classList.toggle("completed");
      updateTaskStatus(taskItem);
    }
  });

  completedTasksContainer.addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("undo-button")) {
      const completedItem = target.closest("tr");
      completedItem.classList.remove("completed");
      updateTaskStatus(completedItem);
    }
  });

  function addTask() {
    const task = todoInput.value.trim();
    if (task === "") {
      return;
    }

    const capitalizedTask = capitalizeFirstLetter(task);

    const taskItem = createTaskItem(taskId, capitalizedTask);
    activeTasksContainer.appendChild(taskItem);

    todoInput.value = "";
    taskId++;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createTaskItem(id, task) {
    const taskItem = document.createElement("tr");
    taskItem.setAttribute("data-id", id);

    const taskIdCell = document.createElement("td");
    taskIdCell.innerText = id;
    taskItem.appendChild(taskIdCell);

    const taskTextCell = document.createElement("td");
    taskTextCell.innerText = task;
    taskItem.appendChild(taskTextCell);

    const actionsCell = document.createElement("td");
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.classList.add("complete-checkbox");
    actionsCell.appendChild(completeCheckbox);
    taskItem.appendChild(actionsCell);

    return taskItem;
  }

  function updateTaskStatus(taskItem) {
    const taskId = taskItem.getAttribute("data-id");
    const completeCheckbox = taskItem.querySelector(".complete-checkbox");

    if (taskItem.classList.contains("completed")) {
      completeCheckbox.style.display = "none";
      const undoButton = createUndoButton();
      taskItem.querySelector("td:last-child").appendChild(undoButton);
      completedTasksContainer.appendChild(taskItem);
    } else {
      completeCheckbox.style.display = "initial";
      taskItem.querySelector(".undo-button").remove();
      activeTasksContainer.appendChild(taskItem);
    }
  }

  function createUndoButton() {
    const undoButton = document.createElement("button");
    undoButton.innerText = "Undo";
    undoButton.classList.add("undo-button");
    return undoButton;
  }
});
