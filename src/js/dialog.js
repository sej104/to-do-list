import { addProject } from './projectController.js';
import { closeDialogEventListener, createFormSubmit, createDialog, createLabel, createInput, createFormHeader, createFormInputs, createPriorityInput, createTextArea } from './utility.js'
import { loadProjects } from '../script.js';

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

    // form.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     dialog.close();
    //     addProject(e.target.title.value);
    //     dialog.remove();
    //     loadProjects();
    // });
}


export { loadAddProjectDialog, loadAddTaskDialog };