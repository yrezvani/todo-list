import {projects, createProject, renderProjects, newProjectBtn, projectsListener, activeProject} from './project';

import {addDummyTask, renderTask, taskForm, taskOpBtns, editForm, addTaskBtn, closeDetails} from './task';

// sample task and project
// const task1 = {
//     title: 'title',
//     description: 'none',
//     dueDate: '11 / 11 / 2023',
//     priority: 'High',
//     completed: 'false',
// };
if (projects.length === 0) {
    const proj1 = createProject('Sample');
    projects.push(proj1);
}
// proj1.todos.push(task1);

// const proj2 = createProject('proj2');
// projects.push(proj2);

taskOpBtns();
taskForm();
renderTask();
addTaskBtn();
closeDetails();

// console.log(proj1.todos.findIndex(x => x.title === 'first'));

projectsListener();
newProjectBtn();
renderProjects();
addDummyTask();
editForm();
