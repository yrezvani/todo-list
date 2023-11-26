import {renderTask, addDummyTask} from './task';

const projects = JSON.parse(localStorage.getItem('myProjects')) || [];

const createProject = function (title) {
    return {title, active: true, todos: []};
};

const renderProjects = function () {
    const projContainer = document.querySelector('.projects');
    projContainer.innerHTML = '';
    for (const project of projects) {
        const div = document.createElement('div');
        projContainer.append(div);
        div.classList.add('project');
        div.innerHTML = `${project.title}<div>
            <button class="proj-delete">Delete</button>
            <button class="proj-rename">Rename</button></div>`;
    }
};

const newProjectBtn = function () {
    const projForm = document.querySelector('.new-proj-form');
    projForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const projectTitle = document.querySelector('#project-title').value;
        if (projectTitle !== '') {
            activeProject().active = false;
            const newProj = createProject(projectTitle);
            projects.push(newProj);
            localStorage.setItem('myProjects', JSON.stringify(projects));
            renderProjects();
            addDummyTask();
            renderTask();
        }
    });
};

const projectsListener = function () {
    const projectsCont = document.querySelector('.projects');
    projectsCont.addEventListener('click', function (e) {
        if (e.target.classList.contains('project')) {
            projects[projects.findIndex(x => x.active === true)].active = false;
            projects[projects.findIndex(x => x.title === e.target.firstChild.textContent)].active = true;
            renderTask();
        }
        if (e.target.classList.contains('proj-delete')) {
            projects.splice(e.target.closest('.project').firstChild.textContent, 1);
            renderProjects();
        }
    });
};

const activeProject = function () {
    return projects[projects.findIndex(x => x.active === true)];
};

export {projects, createProject, renderProjects, newProjectBtn, projectsListener, activeProject};
