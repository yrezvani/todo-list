const newProject = function () {
    const newProj = createProject();
};

const projectBtn = function () {
    const projectsForm = document.querySelector('.projects-form');
    projectsForm.addEventListener('submit', function (e) {
        e.preventDefault;
        newProject(document.querySelector('#project-title'));
        renderProject;
    });
};

const renderProjects = function () {
    const projContainer = document.querySelector('.projects');
    for (const project of projects) {
        const div = document.createElement('div');
        projContainer.append(div);
        div.classList.add('project');
        div.innerHTML = `
        <div>${project.title}
            <button class="proj-delete">Delete</button>
            <button class="proj-rename">Rename</button>
        </div>`;
    }
}

    const div = document.createElement(div);
    div.classList.add('project');
    div.innerHTML = `
    <div>${document.querySelector('#project-title')}
        <button class="proj-delete">Delete</button>
        <button class="proj-rename">Rename</button>
    </div>`;
};
