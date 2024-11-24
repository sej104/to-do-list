import { addProject } from './projectController.js';
import { closeDialogEventListener, createFormSubmit, createDialog, createLabel, createInput, createFormHeader, createFormInputs } from './utility.js'
import { loadProjects } from '../script.js';

function loadAddProjectDialog() {
    const dialog = createDialog();
    const form = document.createElement('form');
    const formHeader = createFormHeader();
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

export { loadAddProjectDialog };