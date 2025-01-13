document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(addTaskToDOM);
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = Array.from(list.children).map(item => ({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed'),
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        const span = document.createElement('span');
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        list.appendChild(li);
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = { text: input.value, completed: false };
        addTaskToDOM(task);
        saveTasks();
        input.value = '';
    });

    loadTasks();
});
