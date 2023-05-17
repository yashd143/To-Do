document.addEventListener("DOMContentLoaded", function() {
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const activeTasksList = document.querySelector(".active-tasks");
  const completedTasksList = document.querySelector(".completed-tasks");

  let tasks = [];

  todoButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  activeTasksList.addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("complete-checkbox")) {
      const todoItem = target.closest("tr");
      const taskId = Number(todoItem.getAttribute("data-task-id"));
      const completed = target.checked;

      updateTaskStatus(taskId, completed);
      renderTasks();
    } else if (target.classList.contains("delete-button")) {
      const todoItem = target.closest("tr");
      const taskId = Number(todoItem.getAttribute("data-task-id"));

      deleteTask(taskId);
      renderTasks();
    }
  });

  completedTasksList.addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("undo-button")) {
      const todoItem = target.closest("tr");
      const taskId = Number(todoItem.getAttribute("data-task-id"));
      const completed = false;

      updateTaskStatus(taskId, completed);
      renderTasks();
    } else if (target.classList.contains("delete-button")) {
      const todoItem = target.closest("tr");
      const taskId = Number(todoItem.getAttribute("data-task-id"));

      deleteTask(taskId);
      renderTasks();
    }
  });

  function addTask() {
    const taskName = todoInput.value.trim();
    if (taskName === "") {
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      completed: false
    };

    tasks.push(newTask);
    renderTasks();

    todoInput.value = "";
  }

  function deleteTask(taskId) {
    tasks = tasks.filter(function(task) {
      return task.id !== taskId;
    });
  }

  function updateTaskStatus(taskId, completed) {
    const taskIndex = tasks.findIndex(function(task) {
      return task.id === taskId;
    });

    if (taskIndex !== -1) {
      tasks[taskIndex].completed = completed;
    }
  }

  function renderTasks() {
    activeTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach(function(task) {
      const taskItem = document.createElement("tr");
      taskItem.setAttribute("data-task-id", task.id);

      const taskIdCell = document.createElement("td");
      taskIdCell.innerText = task.id;

      const taskNameCell = document.createElement("td");
      taskNameCell.innerText = task.name;

      const taskActionsCell = document.createElement("td");
      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.checked = task.completed;
      completeCheckbox.classList.add("complete-checkbox");

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.classList.add("delete-button");

      taskActionsCell.appendChild(completeCheckbox);

      if (task.completed) {
        const undoButton = document.createElement("button");
        undoButton.innerText = "Undo";
        undoButton.classList.add("undo-button");
        taskActionsCell.appendChild(undoButton);
      } else {
        taskActionsCell.appendChild(deleteButton);
      }

      taskItem.appendChild(taskIdCell);
      taskItem.appendChild(taskNameCell);
      taskItem.appendChild(taskActionsCell);

      if (task.completed) {
        completedTasksList.appendChild(taskItem);
      } else {
        activeTasksList.appendChild(taskItem);
      }
    });
  }
});
