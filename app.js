import Todo from './todo.js';
import Storage from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    const renderTasks = () => {
        taskList.innerHTML = '';
        Todo.getTasks().forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.task;

            // Strike-through if completed
            if (task.completed) {
                taskItem.style.textDecoration = 'line-through';
            }

            // Toggle complete status
            taskItem.addEventListener('click', () => {
                Todo.toggleTask(index);
                Storage.saveTasks(Todo.getTasks());
                renderTasks();
            });

            // Remove task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                Todo.removeTask(index);
                Storage.saveTasks(Todo.getTasks());
                renderTasks();
            });

            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTaskInput = document.getElementById('new-task');
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            Todo.addTask(newTask);
            Storage.saveTasks(Todo.getTasks());
            newTaskInput.value = '';
            renderTasks();
        }
    });

    // Load tasks from storage and render
    const storedTasks = Storage.loadTasks();
    storedTasks.forEach(task => Todo.addTask(task.task));
    renderTasks();
});
