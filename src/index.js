// import {newTask} from './task';

const createProject = function (title) {
    return {title, todos: []};
};

const createTodo = function (
    title,
    description,
    dueDate,
    priority,
    notes,
    completed
) {
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        completed,
    };
};

const todo1 = createTodo(
    'first',
    'I have to go home',
    new Date(),
    1,
    "This is the first to do I'm creating",
    false
);

const todo2 = createTodo(
    'second',
    'doing laundry',
    new Date(),
    2,
    'my note',
    true
);

const proj1 = createProject('proj1');

proj1.todos.push(todo1, todo2);

const addTask = function () {
    const addBtn = document.querySelector('.add-task');
    const modal = document.querySelector('dialog');
    addBtn.addEventListener('click', function () {
        modal.showModal();
    });
};

addTask();

console.log(proj1.todos.findIndex(x => x.title === 'first'));
