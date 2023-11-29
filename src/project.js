import {renderTasks, createTodo} from './task';

const projects = JSON.parse(localStorage.getItem('myProjects')) || [];

const createProject = function (title) {
    return {title, active: true, todos: []};
};

const renderProjects = function () {
    const projContainer = document.querySelector('.projects');
    projContainer.innerHTML = '';
    for (const [index, project] of projects.entries()) {
        const div = document.createElement('div');
        projContainer.append(div);
        div.classList.add('project');
        div.innerHTML = `${project.title}<div>
            <button class="proj-delete">Delete</button>
            <button class="rename" data-rename="${index}">Rename</button></div>`;
    }
};

const setProjectListeners = function () {
    const addBtn = document.querySelector('.add-project');
    const projForm = document.querySelector('.new-proj-form');
    const projects = document.querySelector('.projects');
    const renameForm = document.querySelector('form.proj-rename');

    addBtn.addEventListener('click', showProjectForm);

    projForm.addEventListener('submit', createNewProject);

    projects.addEventListener('click', projectsOps);

    renameForm.addEventListener('submit', projRenameForm);
};

const showProjectForm = function (e) {
    const modal = document.querySelector('#proj-dialog');
    modal.showModal();
};

const createNewProject = function (e) {
    const modal = document.querySelector('#proj-dialog');
    e.preventDefault();
    const projectTitle = document.querySelector('#project-title').value;
    if (projectTitle !== '') {
        if (projects.length !== 0) activeProject().active = false;
        const newProj = createProject(projectTitle);
        projects.push(newProj);
        localStorage.setItem('myProjects', JSON.stringify(projects));
        renderProjects();
        renderTasks();
        modal.close();
    }
};

const projectsOps = function (e) {
    const element = e.target;
    if (element.classList.contains('project')) {
        projects[projects.findIndex(x => x.active === true)].active = false;
        projects[projects.findIndex(x => x.title === element.firstChild.textContent)].active = true;
        renderTasks();
    }
    if (element.classList.contains('proj-delete')) {
        const projectIndex = projects.findIndex(x => x.title === element.closest('.project').firstChild.textContent);
        projects.splice(projectIndex, 1);
        if (projects.length === 1) projects[0].active = true;
        localStorage.setItem('myProjects', JSON.stringify(projects));
        renderProjects();
        renderTasks();
    }
    if (element.classList.contains('rename')) {
        activeProject().active = false;
        const projIndex = element.dataset.rename;
        const project = projects[projIndex];
        project.active = true;
        const form = document.querySelector('.proj-rename');
        form.classList.remove('hide');
        document.querySelector('input#proj-rename').value = project.title;
    }
};

const projRenameForm = function (e) {
    const renameForm = document.querySelector('form.proj-rename');
    e.preventDefault();
    renameForm.classList.add('hide');
    activeProject().title = document.querySelector('input#proj-rename').value;
    localStorage.setItem('myProjects', JSON.stringify(projects));
    renderProjects();
};

const addDummyProject = function () {
    if (projects.length === 0) {
        const sampleProj = createProject('Sample');
        projects.push(sampleProj);
        const sampleTodo = createTodo('Sample task', 'none', new Date().toISOString().split('T')[0], 'High', false);
        sampleProj.todos.push(sampleTodo);
        renderTasks();
    }
};

const activeProject = function () {
    if (projects.length === 0) return;
    if (projects.length === 1) projects[0].active = true;
    if (projects.length > 1 && projects[projects.findIndex(x => x.active === true)] === undefined)
        projects[0].active = true;
    return projects[projects.findIndex(x => x.active === true)];
};

export {projects, createProject, renderProjects, activeProject, addDummyProject, setProjectListeners};
