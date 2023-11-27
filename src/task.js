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

const addDummyTask = function () {
    const container = document.querySelector('.task-container');
    if (activeProject().todos.length === 0) {
        const sample = createTodo('Create pseudocode', 'none', new Date().toISOString().split('T')[0], 'high', false);
        activeProject().todos.push(sample);
        renderTask();
    }
};

const renderTask = function () {
    const container = document.querySelector('.task-container');
    container.innerHTML = '';
    console.log(projects);
    const taskList = document.querySelector('.task-list');
    if (activeProject().todos.length === 0) taskList.textContent = 'No tasks to display';
    else {
        taskList.textContent = 'List of Tasks';
        const projTitle = document.querySelector('.proj-name');
        projTitle.textContent = activeProject().title;
        console.log(activeProject().todos);
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

const taskForm = function () {
    const modal = document.querySelector('#task-dialog');
    const form = document.querySelector('.task-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const dueDate = document.querySelector('#due-date').value.toString();
        const priority = document.querySelector('#priority').value;
        const completed = document.querySelector('#completed').checked ? true : false;
        activeProject().todos.push(createTodo(title, description, dueDate, priority, completed));
        localStorage.setItem('myProjects', JSON.stringify(projects));
        renderTask();
        modal.close();
        console.log(dueDate);
    });
};

let activeTask;

const taskOpBtns = function () {
    const taskCont = document.querySelector('.task-container');
    taskCont.addEventListener('click', e => {
        const element = e.target;
        if (element.classList.contains('fa-trash')) {
            const taskIndex = element.dataset.task;
            activeProject().todos.splice(taskIndex, 1);
            localStorage.setItem('myProjects', JSON.stringify(projects));
            renderTask();
        } else if (element.classList.contains('fa-pencil')) {
            activeTask = element.dataset.edit;
            activeProject().todos[activeTask].active = true;
            const modal = document.querySelector('#edit-dialog');
            modal.showModal();
            document.querySelector('input#edit-title').value = activeProject().todos[activeTask].title;
            document.querySelector('textarea#edit-description').value = activeProject().todos[activeTask].description;
            document.querySelector('input#edit-due-date').value = activeProject().todos[activeTask].dueDate;
            document.querySelector('select#edit-priority').value = activeProject().todos[activeTask].priority;
            document.querySelector('input#edit-completed').value = activeProject().todos[activeTask].completed;
        } else if (element.classList.contains('details')) {
            const mainApp = document.querySelector('.main');
            const detailsWindow = document.createElement('div');
            detailsWindow.classList.add('task-details');
            mainApp.append(detailsWindow);
            const todoIndex = element.dataset.detail;
            const todo = activeProject().todos[todoIndex];
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
            // todo.completed ? (todo.completed = false) : (todo.completed = true);
            localStorage.setItem('myProjects', JSON.stringify(projects));
            renderTask();
        }
    });
};

const closeDetails = function () {
    const mainApp = document.querySelector('.main');
    mainApp.addEventListener('click', e => {
        const element = e.target;
        if (element.classList.contains('close-details')) {
            const detailsWindow = document.querySelector('.task-details');
            detailsWindow.remove();
        }
    });
};

const editForm = function () {
    const form = document.querySelector('.edit-form');
    const modal = document.querySelector('#edit-dialog');
    form.addEventListener('submit', e => {
        e.preventDefault();
        activeTask = activeProject().todos[activeProject().todos.findIndex(x => x.active === true)];
        activeTask.title = document.querySelector('input#edit-title').value;
        activeTask.description = document.querySelector('textarea#edit-description').value;
        activeTask.dueDate = document.querySelector('input#edit-due-date').value;
        activeTask.priority = document.querySelector('select#edit-priority').value;
        activeTask.completed = document.querySelector('input#edit-completed').value;
        activeTask.active = false;
        localStorage.setItem('myProjects', JSON.stringify(projects));
        modal.close();
        renderTask();
    });
};

const addTaskBtn = function () {
    const addBtn = document.querySelector('.add-task');
    const modal = document.querySelector('dialog');
    addBtn.addEventListener('click', function () {
        modal.showModal();
    });
};

export {createTodo, addDummyTask, renderTask, taskForm, taskOpBtns, editForm, addTaskBtn, closeDetails};
