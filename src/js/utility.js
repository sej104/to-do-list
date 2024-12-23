import closeImage from '../images/close.svg';
import { format } from 'date-fns';

function createIcon(src, alt, height, width) {
    const icon = document.createElement('img');
    icon.src = src;
    icon.alt = alt;
    if (height && width) {
        icon.height = height;
        icon.width = width;
    }
    return icon;
}

function createDialog(id, title) {
    const dialog = document.createElement('dialog');
    dialog.id = id;

    const form = document.createElement('form');

    const formHeader = document.createElement('div');
    formHeader.classList.add('form-header');

    const dialogTitle = document.createElement('h2');
    dialogTitle.textContent = title;

    const closeDialogButton = document.createElement('button');
    closeDialogButton.setAttribute('type', 'button');
    closeDialogButton.id = 'close-dialog';
    closeDialogButton.setAttribute('autofocus', '');
    closeDialogButton.addEventListener('click', () => dialog.remove());

    const icon = createIcon(closeImage);
    closeDialogButton.append(icon);

    formHeader.append(dialogTitle, closeDialogButton);

    const formInputs = document.createElement('div');
    formInputs.classList.add('form-inputs');

    const formSubmit = document.createElement('div');
    formSubmit.classList.add('form-submit');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.id = 'submit-btn';
    submitButton.textContent = 'Submit';
    
    formSubmit.append(submitButton);

    form.append(formHeader, formInputs, formSubmit);
    dialog.append(form);
    document.querySelector('body').append(dialog);

    dialog.showModal();
    return dialog;
}

function createLabel(inputId, textContent) {
    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = textContent;
    return label;
}

function createInput(type, id, name, value) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.id = id;
    input.setAttribute('name', name);
    if (value) input.setAttribute('value', value);
    input.setAttribute('required', '');
    return input;
}

function createTextArea(identifier) {
    const textArea = document.createElement('textarea');
    textArea.id = identifier;
    textArea.setAttribute('name', identifier);
    textArea.setAttribute('rows', '2');
    return textArea;
}

function createRadioButton(id, name, value) {
    const container = document.createElement('li');
    const input = createInput('radio', id, name, value);
    //Capitalize first letter in label
    const label = createLabel(id, 
        `${value.charAt(0).toUpperCase()}${value.slice(1)}`
    );
    label.classList.add('radio-label');

    container.append(input, label);
    return container;
}

function createPriorityContainer() {
    const fieldSet = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent= 'Priority';
    const ul = document.createElement('ul');

    ul.append(
        createRadioButton('low_priority', 'priority', 'low'),
        createRadioButton('medium_priority', 'priority', 'medium'),
        createRadioButton('high_priority', 'priority', 'high')
    );

    fieldSet.append(legend, ul);
    return fieldSet;
}

function createTaskDialogInputs() {
    const asterisk = document.createElement('span');
    asterisk.setAttribute('aria-label', 'required');
    asterisk.textContent = ' *';

    const titleContainer = document.createElement('p');
    const titleLabel = createLabel('title', 'Title');
    titleLabel.append(asterisk);
    const titleInput = createInput('text', 'title', 'title');
    titleInput.setAttribute('maxlength', '25');
    titleContainer.append(titleLabel, titleInput);

    const descriptionContainer = document.createElement('p');
    const descriptionLabel = createLabel('description', 'Description');
    const descriptionInput = createTextArea('description');
    descriptionContainer.append(descriptionLabel, descriptionInput);

    const dueDateContainer = document.createElement('p');
    const dueDateLabel = createLabel('due_date', 'Due Date ');
    dueDateLabel.append(asterisk.cloneNode(true));
    const dueDateInput = createInput('date', 'due_date', 'due_date');
    dueDateInput.setAttribute('min', `${format(new Date(), 'yyyy-MM-dd')}`);
    dueDateContainer.append(dueDateLabel, dueDateInput);

    const priorityContainer = createPriorityContainer();

    return [titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer];
}

function setRadioButton(radioButtonId) {
    const radioButton = document.querySelector(`#${radioButtonId}`);
    radioButton.setAttribute('checked', '');
}

function setTaskInputValues(task) {
    const titleInput = document.querySelector('#title');
    titleInput.setAttribute('value', task.title);

    const descriptionInput = document.querySelector('#description');
    descriptionInput.textContent = task.description;

    const dueDateInput = document.querySelector('#due_date');
    dueDateInput.setAttribute('value', task.dueDate);

    switch(task.priority) {
        case 'low': 
            setRadioButton('low_priority');
            break;
        case 'medium':                    
            setRadioButton('medium_priority');
            break;
        case 'high':
            setRadioButton('high_priority');
            break;
    }
}

export { 
    createIcon,
    createDialog,
    createLabel,
    createInput,
    createTaskDialogInputs,
    setRadioButton,
    setTaskInputValues
}