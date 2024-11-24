import { closeDialogEventListener, createFormSubmit, createDialog, createLabel, createInput, createFormHeader, createFormInputs, createPriorityInput, createTextArea } from './utility.js'
import { getProjects, addProject, deleteProject } from './projectController.js'
import { addTask } from './taskController.js';

function getActiveProject() {
    return document.querySelector('.active');
}

function loadProjects() {
    const projectContainer = document.querySelector('#project-container');
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

function loadAddProjectDialog() {
    const dialog = createDialog('add-project-dialog');
    const form = document.createElement('form');
    const formHeader = createFormHeader('Add Project');
    const formInputs = createFormInputs();
    const formSubmit = createFormSubmit();

    const titleContainer = document.createElement('p');
    const titleLabel = createLabel('title', 'Title');
    const titleInput = createInput('text', 'title', 'title');
    titleContainer.append(titleLabel, titleInput);
    formInputs.append(titleContainer);

    form.append(formHeader, formInputs, formSubmit);
    dialog.append(form);
    document.querySelector('body').append(dialog);

    dialog.showModal();
    closeDialogEventListener(dialog);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        dialog.close();
        addProject(e.target.title.value);
        dialog.remove();
        loadProjects();
    });
}

function loadAddTaskDialog() {
    const dialog = createDialog('add-task-dialog');
    const form = document.createElement('form');
    const formHeader = createFormHeader('Add Task');
    const formInputs = createFormInputs();
    const formSubmit = createFormSubmit();

    const titleContainer = document.createElement('p');
    const titleLabel = createLabel('title', 'Title')
    const titleInput = createInput('text', 'title', 'title');
    titleContainer.append(titleLabel, titleInput);

    const descriptionContainer = document.createElement('p');
    const descriptionLabel = createLabel('description', 'Description');
    const descriptionInput = createTextArea();
    descriptionContainer.append(descriptionLabel, descriptionInput);

    const dueDateContainer = document.createElement('p');
    const dueDateLabel = createLabel('due_date', 'Due Date');
    const dueDateInput = createInput('date', 'due_date', 'due_date');
    dueDateContainer.append(dueDateLabel, dueDateInput);

    const priorityContainer = createPriorityInput();

    formInputs.append(titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer);
    form.append(formHeader, formInputs, formSubmit);
    dialog.append(form);
    document.querySelector('body').append(dialog);

    dialog.showModal();
    closeDialogEventListener(dialog);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        dialog.close();
        const activeProject = getActiveProject();
        addTask(
            activeProject.dataset.projectIndex,
            e.target.title.value,
            e.target.description.value,
            e.target.due_date.value,
            e.target.priority.value
        );
        console.log(getProjects());
        dialog.remove();
        loadProjects();
    });
}

function clickHandlerSelectProject(e) {
    const selectedProject = e.target.closest('button');
    if (!selectedProject) return;

    const activeProject = getActiveProject();
    if (activeProject) {
        activeProject.classList.remove('active');
    }
    
    selectedProject.classList.add('active');
    //call function to render tasks
}

function clickHandlerDeleteProject(e) {
    if (!e.target.matches('img')) return; 

    const selectedProject = e.target.closest('button').dataset.projectIndex;
    deleteProject(selectedProject);
    loadProjects();
}

export { 
    loadProjects, 
    loadAddProjectDialog, 
    loadAddTaskDialog, 
    clickHandlerSelectProject, 
    clickHandlerDeleteProject 
};