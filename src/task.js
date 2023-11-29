import {projects, activeProject} from './project';

const createTodo = function (title, description, dueDate, priority, completed) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed,
        active: false,
    };
};

const renderTasks = function () {
    const container = document.querySelector('.task-container');
    container.innerHTML = '';
    const taskList = document.querySelector('.task-list');
    const projTitle = document.querySelector('.proj-name');
    if (projects.length === 0) {
        projTitle.textContent = 'No projects to display';
        taskList.classList.add('hide');
    } else if (activeProject().todos.length === 0) {
        taskList.textContent = 'No tasks to display';
        projTitle.textContent = activeProject().title;
    } else {
        taskList.classList.remove('hide');
        taskList.textContent = 'List of Tasks';
        projTitle.textContent = activeProject().title;
        for (const [index, todo] of activeProject().todos.entries()) {
            const div = document.createElement('div');
            div.classList.add('task');
            container.append(div);
            div.innerHTML = `<div>
                <div class="${todo.completed ? 'complete' : 'incomplete'} hover" data-completed="${index}"></div>
                <div class="title" ${todo.completed ? 'style="text-decoration: line-through"' : ''}>${todo.title}</div>
                </div>
                <div>
                <button class="details hover" data-detail="${index}">DETAILS</button>
                <i class="fa-solid fa-pencil hover" data-edit="${index}"></i>
                <i class="fa-solid fa-trash hover" data-task="${index}"></i>
                </div>`;
        }
    }
};

const setTaskListeners = function () {
    const taskForm = document.querySelector('.task-form');
    const editForm = document.querySelector('.edit-form');
    const tasks = document.querySelector('.task-container');
    const wrapper = document.querySelector('.wrapper');
    const addBtn = document.querySelector('.add-task');

    addBtn.addEventListener('click', addTask);

    taskForm.addEventListener('submit', createTask);

    editForm.addEventListener('submit', editTask);

    tasks.addEventListener('click', taskOperations);

    wrapper.addEventListener('click', closeDetails);
};

const createTask = function (e) {
    const modal = document.querySelector('#task-dialog');
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value.toString();
    const priority = document.querySelector('#priority').value;
    const completed = document.querySelector('#completed').checked;
    activeProject().todos.push(createTodo(title, description, dueDate, priority, completed));
    localStorage.setItem('myProjects', JSON.stringify(projects));
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#due-date').value = '';
    document.querySelector('#priority').value = 'High';
    document.querySelector('#completed').checked = false;
    renderTasks();
    modal.close();
};

const taskOperations = function (e) {
    const element = e.target;
    if (element.classList.contains('fa-trash')) {
        const taskIndex = element.dataset.task;
        activeProject().todos.splice(taskIndex, 1);
        localStorage.setItem('myProjects', JSON.stringify(projects));
        renderTasks();
    } else if (element.classList.contains('fa-pencil')) {
        const todoIndex = element.dataset.edit;
        activeProject().todos[todoIndex].active = true;
        const modal = document.querySelector('#edit-dialog');
        modal.showModal();
        const todo = activeProject().todos[todoIndex];
        document.querySelector('input#edit-title').value = todo.title;
        document.querySelector('textarea#edit-description').value = todo.description;
        document.querySelector('input#edit-due-date').value = todo.dueDate;
        document.querySelector('select#edit-priority').value = todo.priority;
        document.querySelector('input#edit-completed').checked = todo.completed;
    } else if (element.classList.contains('details')) {
        const wrapper = document.querySelector('.wrapper');
        const detailsWindow = document.createElement('div');
        detailsWindow.classList.add('task-details');
        wrapper.append(detailsWindow);
        const todoIndex = element.dataset.detail;
        const todo = activeProject().todos[todoIndex];
        const leftPanel = document.querySelector('.left');
        const mainApp = document.querySelector('.main');
        leftPanel.setAttribute('style', 'filter: blur(20px)');
        mainApp.setAttribute('style', 'filter: blur(20px)');
        detailsWindow.innerHTML = `<div class="close-details">x</div>
            <div><h4>Title:</h4>${todo.title}</div>
            <div><h4>Priority:</h4>${todo.priority}</div>
            <div><h4>Due Date:</h4>${todo.dueDate}</div>
            <div><h4>Description:</h4>${todo.description}</div>`;
    } else if (element.classList.contains('incomplete') || element.classList.contains('complete')) {
        const todoIndex = element.dataset.completed;
        const todo = activeProject().todos[todoIndex];
        if (todo.completed) todo.completed = false;
        else todo.completed = true;
        localStorage.setItem('myProjects', JSON.stringify(projects));
        renderTasks();
    }
};

const closeDetails = function (e) {
    const element = e.target;
    if (element.classList.contains('close-details')) {
        const detailsWindow = document.querySelector('.task-details');
        detailsWindow.remove();
        const leftPanel = document.querySelector('.left');
        const mainApp = document.querySelector('.main');
        leftPanel.setAttribute('style', 'filter: initial');
        mainApp.setAttribute('style', 'filter: initial');
    }
};

const editTask = function (e) {
    e.preventDefault();
    const modal = document.querySelector('#edit-dialog');
    const activeTask = activeProject().todos[activeProject().todos.findIndex(x => x.active === true)];
    activeTask.title = document.querySelector('input#edit-title').value;
    activeTask.description = document.querySelector('textarea#edit-description').value;
    activeTask.dueDate = document.querySelector('input#edit-due-date').value;
    activeTask.priority = document.querySelector('select#edit-priority').value;
    activeTask.completed = document.querySelector('input#edit-completed').checked;
    activeTask.active = false;
    localStorage.setItem('myProjects', JSON.stringify(projects));
    modal.close();
    renderTasks();
};

const addTask = function (e) {
    const modal = document.querySelector('#task-dialog');
    if (projects.length !== 0) modal.showModal();
    else alert('Please add a project first');
};

export {createTodo, renderTasks, setTaskListeners};
