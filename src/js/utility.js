function createDialog() {
    const dialog = document.createElement('dialog');
    dialog.id = 'add-project-dialog';
    return dialog;
}

function createLabel(inputId, textContent) {
    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = textContent;
    return label;
}

function createInput(type, id, name) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.id = id;
    input.setAttribute('name', name);
    input.setAttribute('required', '');
    return input;
}

function createSubmitButton() {
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.id = 'submit-btn';
    submitButton.textContent = 'Submit';
    return submitButton;
}

function createFormInputs() {
    const formInputs = document.createElement('div');
    formInputs.classList.add('form-inputs');
    return formInputs;
}

function createFormSubmit() {
    const formSubmit = document.createElement('div');
    formSubmit.classList.add('form-submit');
    const submitButton = createSubmitButton();
    formSubmit.append(submitButton);
    return formSubmit;
}

function createFormHeader() {
    const formHeader = document.createElement('div');
    formHeader.classList.add('form-header');

    const dialogHeading = document.createElement('h2');
    dialogHeading.textContent = 'Add Project';

    const closeDialogButton = document.createElement('button');
    closeDialogButton.setAttribute('type', 'button');
    closeDialogButton.id = 'close-dialog';
    closeDialogButton.setAttribute('autofocus', '');

    const icon = document.createElement('img');
    icon.src = './images/close.svg';
    icon.alt = 'Close icon';
    closeDialogButton.append(icon);

    formHeader.append(dialogHeading, closeDialogButton);
    return formHeader;
}

function closeDialogEventListener(dialog) {
    const closeDialogButton = dialog.querySelector('#close-dialog');
    closeDialogButton.addEventListener('click', () => {
        dialog.close();
        dialog.remove();
    });
}

export { 
    closeDialogEventListener,
    createDialog,
    createLabel,
    createInput,
    createFormHeader,
    createFormInputs,
    createFormSubmit
}