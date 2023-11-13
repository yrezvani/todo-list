const newTask = function () {
    const container = document.querySelector('.task-container');
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value;
    const priority = document.querySelector('#priority').value;
    const div = document.createElement('div');
    div.classList.add('task');
    container.append(div);
    div.innerHTML = `<div class="title">task 1</div>
    <div class="date">22 Feb</div>
    <div class="completed">Not completed</div>
    <i class="fa-solid fa-pencil"></i>
    <i class="fa-solid fa-trash"></i>`;
};

const newProject = function () {
    const title = document.querySelector('.title');
    title.textContent = 'new project';
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = '';
};

const addTask = function () {
    const addBtn = document.querySelector('.add-task');
    const modal = document.querySelector('dialog');
    addBtn.addEventListener('click', function () {
        modal.showModal();
    });
};

export {newTask};
