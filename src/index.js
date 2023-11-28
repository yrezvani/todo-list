import {renderProjects, addDummyProject, createProjectListeners} from './project';

import {renderTasks, createTaskListeners} from './task';

addDummyProject();
renderTasks();
createProjectListeners();
createTaskListeners();
renderProjects();
