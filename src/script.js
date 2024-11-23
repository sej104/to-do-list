import { getProjects, addProject, deleteProject } from './js/projectController.js'
const addProjectButton = document.querySelector('#add-project-btn');
const projectContainer = document.querySelector('#project-container');

function updateProjects() {
    projectContainer.textContent = '';

    const heading = document.createElement('h3');
    heading.textContent = 'Projects:';
    projectContainer.append(heading);

    const projects = getProjects();
    projects.forEach(project => {
        const button = document.createElement('button');
        button.classList.add('project');
        button.dataset.projectIndex = projects.indexOf(project);

        const projectTitle = document.createElement('span');
        projectTitle.textContent = project.title;
        
        const trashIcon = document.createElement('img');
        trashIcon.src = './images/trash.svg';
        trashIcon.alt = 'Trash icon';
        trashIcon.setAttribute('height', '25');
        trashIcon.setAttribute('width', '25');

        button.append(projectTitle, trashIcon);
        projectContainer.append(button);
    });
}

function clickHandlerDeleteProject(e) {
    if (!e.target.matches('img')) return; 

    const selectedProject = e.target.closest('button').dataset.projectIndex;
    deleteProject(selectedProject);
    updateProjects();
}

function loadAddProjectDialog() {
    const dialog = document.createElement('dialog');
    dialog.id = 'add-project-dialog';

    const form = document.createElement('form');

    const formHeader = document.createElement('div');
    formHeader.classList.add('form-header');

    const dialogHeading = document.createElement('h2');
    dialogHeading.textContent = 'Add Project';

    const closeDialogButton = document.createElement('button');
    closeDialogButton.setAttribute('type', 'button');
    closeDialogButton.setAttribute('autofocus', '');
    closeDialogButton.classList.add('close-dialog');

    const icon = document.createElement('img');
    icon.src = './images/close.svg';
    icon.alt = 'Close icon';
    closeDialogButton.append(icon);

    formHeader.append(dialogHeading, closeDialogButton);
    form.append(formHeader);

    const formInputs = document.createElement('div');
    formInputs.classList.add('form-inputs');

    const para = document.createElement('p');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'title';
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('required', '');

    para.append(titleLabel, titleInput);
    formInputs.append(para);
    form.append(formInputs);

    const formSubmit = document.createElement('div');
    formSubmit.classList.add('form-submit');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.id = 'submit-btn';
    submitButton.textContent = 'Submit';

    formSubmit.append(submitButton);
    form.append(formSubmit);
    dialog.append(form);

    document.querySelector('body').append(dialog);

    dialog.showModal();

    closeDialogButton.addEventListener('click', () => {
        dialog.close();
        dialog.remove();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        dialog.close();
        addProject(event.target.title.value);
        dialog.remove();
        updateProjects();
    });
}

addProjectButton.addEventListener('click', loadAddProjectDialog);

projectContainer.addEventListener('click', clickHandlerDeleteProject);
