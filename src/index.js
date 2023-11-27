import {
    projects,
    createProject,
    renderProjects,
    newProjectBtn,
    projectsListener,
    activeProject,
    addDummyProject,
    projRename,
} from './project';

import {addDummyTask, renderTask, taskForm, taskOpBtns, editForm, addTaskBtn, closeDetails} from './task';

// sample task and project
// const task1 = {
//     title: 'title',
//     description: 'none',
//     dueDate: '11 / 11 / 2023',
//     priority: 'High',
//     completed: 'false',
// };

// proj1.todos.push(task1);

// const proj2 = createProject('proj2');
// projects.push(proj2);
addDummyProject();
taskOpBtns();
taskForm();
renderTask();
addTaskBtn();
closeDetails();

// console.log(proj1.todos.findIndex(x => x.title === 'first'));

projectsListener();
projRename();
newProjectBtn();
renderProjects();
addDummyTask();
editForm();
