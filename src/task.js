const addTask = function () {
    const taskForm = document.querySelector('.task-form');
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        renderTask();
        const newTask = createTodo();
        console.log(newTask);
    });
};

const renderTask = function () {
    const container = document.querySelector('.task-container');
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value.toString();
    const priority = document.querySelector('#priority').value;
    const completed = document.querySelector('#completed').checked;
    const div = document.createElement('div');
    div.classList.add('task');
    container.append(div);
    console.log(div);
    div.innerHTML = `<div class="title">${title}</div>
    <div class="description">${description}</div>
    <div class="date">${dueDate}</div>
    <div class="priority">${priority}</div>
    <div class="completed">${completed ? 'Completed' : 'Not Completed'}</div>
    <i class="fa-solid fa-pencil"></i>
    <i class="fa-solid fa-trash"></i>`;
};

const addProject = function () {
    const title = document.querySelector('.title');
    title.textContent = 'new project';
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = '';
};

const addTaskBtn = function () {
    const addBtn = document.querySelector('.add-task');
    const modal = document.querySelector('dialog');
    addBtn.addEventListener('click', function () {
        modal.showModal();
    });
};

const submitTask = function () {
    const taskSubmit = document.querySelector('#task-submit');

    taskSubmit.addEventListener('submit', newTask);
};

export {newTask};
