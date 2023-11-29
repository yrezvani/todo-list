import {renderProjects, addDummyProject, setProjectListeners} from './project';

import {renderTasks, setTaskListeners} from './task';

addDummyProject();
renderTasks();
setProjectListeners();
setTaskListeners();
renderProjects();
