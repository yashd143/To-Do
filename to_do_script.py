from tkinter import *

tasks = []
task_id = 1

def add_task():
    task_name = todo_input.get().strip()

    if task_name == "":
        return

    new_task = {
        "id": task_id,
        "name": task_name.capitalize(),
        "completed": False
    }

    tasks.append(new_task)
    render_tasks()

    todo_input.delete(0, END)
    task_id += 1

def complete_task(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)

    if task:
        task["completed"] = True
        render_tasks()

def undo_task(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)

    if task:
        task["completed"] = False
        render_tasks()

def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    render_tasks()

def render_tasks():
    active_tasks_container.delete(*active_tasks_container.get_children())
    completed_tasks_container.delete(*completed_tasks_container.get_children())

    for task in tasks:
        task_row = (task["id"], task["name"])

        if task["completed"]:
            completed_tasks_container.insert("", END, values=task_row + ("",))
        else:
            active_tasks_container.insert("", END, values=task_row + (create_complete_button(task["id"]), create_delete_button(task["id"])))

def create_complete_button(task_id):
    return Button(text="Complete", command=lambda: complete_task(task_id))

def create_delete_button(task_id):
    return Button(text="Delete", command=lambda: delete_task(task_id))

# Create the main window
root = Tk()
root.title("Todo App")

# Create the input field
todo_input = Entry(root, width=30)
todo_input.grid(row=0, column=0, padx=10, pady=10)

# Create the add button
add_button = Button(root, text="Add Task", command=add_task)
add_button.grid(row=0, column=1, padx=10, pady=10)

# Create the active tasks container
active_tasks_container = Treeview(root, columns=("ID", "Task", "Actions"))
active_tasks_container.heading("#0", text="", anchor=W)
active_tasks_container.column("#0", width=0, stretch=NO)
active_tasks_container.heading("ID", text="ID", anchor=W)
active_tasks_container.heading("Task", text="Task", anchor=W)
active_tasks_container.heading("Actions", text="Actions", anchor=W)
active_tasks_container.column("Actions", width=100, anchor=W)
active_tasks_container.grid(row=1, column=0, padx=10, pady=10)

# Create the completed tasks container
completed_tasks_container = Treeview(root, columns=("ID", "Task", "Actions"))
completed_tasks_container.heading("#0", text="", anchor=W)
completed_tasks_container.column("#0", width=0, stretch=NO)
completed_tasks_container.heading("ID", text="ID", anchor=W)
completed_tasks_container.heading("Task", text="Task", anchor=W)
completed_tasks_container.heading("Actions", text="Actions", anchor=W)
completed_tasks_container.column("Actions", width=100, anchor=W)
completed_tasks_container.grid(row=1, column=1, padx=10, pady=10)

root.mainloop()
