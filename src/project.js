import {renderTask, addDummyTask} from './task';

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
        const element = e.target;
        if (element.classList.contains('project')) {
            projects[projects.findIndex(x => x.active === true)].active = false;
            projects[projects.findIndex(x => x.title === element.firstChild.textContent)].active = true;
            renderTask();
        }
        if (element.classList.contains('proj-delete')) {
            projects.splice(element.closest('.project').firstChild.textContent, 1);
            renderProjects();
            renderTask();
        }
        if (element.classList.contains('rename')) {
            activeProject().active = false;
            const projIndex = element.dataset.rename;
            const project = projects[projIndex];
            project.active = true;
            const form = document.querySelector('.proj-rename');
            form.classList.remove('hide');
            document.querySelector('input#proj-rename').value = project.title;
            // const div = document.createElement('div');
            // wrapper.append(div);
            // div.innerHTML = `<form action="" class="proj-rename">
            //     <input type="text" id="proj-rename" name="proj-name" value="${project.title}"/>
            //     <button type="submit" id="proj-rename">Rename</button>
            //     </form>`;
            // renderProjects();
        }
    });
};

const projRename = function () {
    const form = document.querySelector('form.proj-rename');
    form.addEventListener('submit', e => {
        e.preventDefault();
        form.classList.add('hide');
        activeProject().title = document.querySelector('input#proj-rename').value;
        localStorage.setItem('myProjects', JSON.stringify(projects));
        renderProjects();
    });
};

const addDummyProject = function () {
    if (projects.length === 0) {
        const proj1 = createProject('Sample');
        projects.push(proj1);
    }
};

const activeProject = function () {
    return projects[projects.findIndex(x => x.active === true)];
};

export {
    projects,
    createProject,
    renderProjects,
    newProjectBtn,
    projectsListener,
    activeProject,
    addDummyProject,
    projRename,
};
