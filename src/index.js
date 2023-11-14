// import {newTask} from './task';

// import {newTask} from './task';

const createProject = function (title) {
    return {title, active: true, todos: []};
};

const projects = [];

const createTodo = function () {
    return {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        dueDate: document.querySelector('#due-date').value.toString(),
        priority: document.querySelector('#priority').value,
        completed: document.querySelector('#completed').checked ? 'Completed' : 'Not Completed',
    };
};

const activeProject = function () {
    return projects[projects.findIndex(x => x.active === true)];
};

// sample task and project
const task1 = {
    title: 'title',
    description: 'none',
    dueDate: '11 / 11 / 2023',
    priority: 'High',
    completed: 'false',
};
const proj1 = createProject('proj1');
proj1.active = false;
proj1.todos.push(task1);
const proj2 = createProject('proj2');
projects.push(proj1);
projects.push(proj2);

const addTaskBtn = function () {
    const addBtn = document.querySelector('.add-task');
    const modal = document.querySelector('dialog');
    addBtn.addEventListener('click', function () {
        modal.showModal();
        addTask();
    });
};

const addTask = function () {
    const taskForm = document.querySelector('.task-form');
    const modal = document.querySelector('dialog');
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        activeProject().todos.push(createTodo());
        renderTask();
        modal.close();
    });
};
console.log(projects);
const renderTask = function () {
    const container = document.querySelector('.task-container');
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value.toString();
    const priority = document.querySelector('#priority').value;
    const completed = document.querySelector('#completed').checked;
    if (title !== '') {
        container.innerHTML = '';
        console.log(activeProject().todos);
        for (const todo of activeProject().todos) {
            const div = document.createElement('div');
            div.classList.add('task');
            container.append(div);
            div.innerHTML = `<div class="title">${todo.title}</div>
            <div class="description">${todo.description}</div>
            <div class="date">${todo.dueDate}</div>
            <div class="priority">${todo.priority}</div>
            <div class="completed">${todo.completed ? 'Completed' : 'Not Completed'}</div>
            <i class="fa-solid fa-pencil"></i>
            <i class="fa-solid fa-trash"></i>`;
        }
    }
};

renderTask();
addTaskBtn();

// const addProject = function () {
//     const title = document.querySelector('.title');
//     title.textContent = 'new project';
//     const taskContainer = document.querySelector('.task-container');
//     taskContainer.innerHTML = '';
// };

// console.log(proj1.todos.findIndex(x => x.title === 'first'));

console.log(projects);
const renderProjects = function () {
    const projContainer = document.querySelector('.projects');
    projContainer.innerHTML = '';
    console.log(projects);
    for (const project of projects) {
        const div = document.createElement('div');
        projContainer.append(div);
        div.classList.add('project');
        div.innerHTML = `${project.title}<div>
            <button class="proj-delete">Delete</button>
            <button class="proj-rename">Rename</button></div>`;
    }
};
console.log(projects);
const newProjectBtn = function () {
    const projForm = document.querySelector('.new-proj-form');
    projForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const projectTitle = document.querySelector('#project-title').value;
        console.log(projects);
        if (projectTitle !== '') {
            console.log('works');
            activeProject().active = false;
            const newProj = createProject(projectTitle);
            console.log(newProj);
            projects.push(newProj);
            console.log(projects);
            renderProjects();
            addDummyTask();
            console.log(projects);
            renderTask();
        }
    });
};

const addDummyTask = function () {
    const dummyTask = {
        title: 'Sample',
        description: 'Preparation',
        dueDate: new Date().toDateString(),
        priority: 'Medium',
        completed: 'Not Completed',
    };
    activeProject().todos.push(dummyTask);
};

const projectsListener = function () {
    const projectsCont = document.querySelector('.projects');
    console.log(projects);
    projectsCont.addEventListener('click', function (e) {
        if (e.target.classList.contains('project')) {
            projects[projects.findIndex(x => x.active === true)].active = false;
            projects[projects.findIndex(x => x.title === e.target.firstChild.textContent)].active = true;
            renderTask();
        }
        if (e.target.classList.contains('proj-delete')) {
            projects.splice(e.target.closest('.project').firstChild.textContent, 1);
            renderProjects();
            console.log(projects);
        }
        console.log(projects[projects.findIndex(x => x.active === true)]);
    });
};
projectsListener();
newProjectBtn();
renderProjects();
