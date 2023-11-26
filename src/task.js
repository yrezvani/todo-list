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
    if (activeProject().todos.length === 0 && container.innerHTML === '') {
        const div = document.createElement('div');
        div.classList.add('task');
        container.append(div);
        div.innerHTML = `<div>
            <div class="incomplete hover"></div>
            <div class="title">Sample</div>
            </div>
            <div>
            <button class="details hover" data-detail="dummy">DETAILS</button>
            <i class="fa-solid fa-pencil hover" data-edit="dummy"></i>
            <i class="fa-solid fa-trash hover" data-task="dummy"></i>
            </div>`;
        // <i class="fa-solid fa-pencil"></i>
        // <i class="fa-solid fa-trash"></i>`;
    }
};

const renderTask = function () {
    const container = document.querySelector('.task-container');
    container.innerHTML = '';
    addDummyTask();
    for (const [index, todo] of activeProject().todos.entries()) {
        console.log(todo.completed);
        const div = document.createElement('div');
        div.classList.add('task');
        container.append(div);
        div.innerHTML = `<div>
            <div class="${todo.completed ? 'complete' : 'incomplete'} hover"></div>
            <div class="title">${todo.title}</div>
            </div>
            <div>
            <button class="details hover" data-detail="${index}">DETAILS</button>
            <i class="fa-solid fa-pencil hover" data-edit="${index}"></i>
            <i class="fa-solid fa-trash hover" data-task="${index}"></i>
            </div>`;
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
            detailsWindow.innerHTML = `<div class="close-details">x</div>
                <div><h4>Title:</h4>${activeProject().todos[todoIndex].title}</div>
                <div><h4>Priority:</h4>${activeProject().todos[todoIndex].priority}</div>
                <div><h4>Due Date:</h4>${activeProject().todos[todoIndex].dueDate}</div>
                <div><h4>Description:</h4>${activeProject().todos[todoIndex].description}</div>`;
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
