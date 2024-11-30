import { getProjects, addProject, 
    deleteProject } from './projectController.js';
import { addTask, editTask, deleteTask, 
    getProjectTasks, getTask } from './taskController.js';
import { createDialog, createLabel, createInput, setTaskInputValues,
    createIcon, setRadioButton, createTaskDialogInputs } from './utility.js';
import editImage from '../images/edit.svg';
import infoImage from '../images/info.svg';
import trashImage from '../images/trash.svg';
import { format, parseISO } from 'date-fns';

function getActiveProject() {
    return document.querySelector('.active');
}

function removeTasks() {
    const projectTitle = document.querySelector('#project-title');
    projectTitle.textContent = 'Select a Project...';

    const addTaskButton = document.querySelector('#add-task-btn');
    if (addTaskButton) addTaskButton.remove();

    const taskContainer = document.querySelector('#task-container');
    taskContainer.textContent = '';
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
        button.setAttribute('type', 'button');
        button.classList.add('project');
        button.dataset.projectIndex = projects.indexOf(project);

        const projectTitle = document.createElement('span');
        projectTitle.textContent = project.title;
        
        const trashIcon = createIcon(trashImage, 'Trash icon', 25, 25);

        button.append(projectTitle, trashIcon);
        projectContainer.append(button);
    });
}

function loadTasks() {
    removeTasks();
    const activeProject = getActiveProject();

    if (activeProject) {
        const projectHeader = document.querySelector('#project-header');

        const projectTitle = document.querySelector('#project-title');
        projectTitle.textContent = activeProject.textContent;

        const addTaskButton = document.createElement('button');
        addTaskButton.setAttribute('type', 'button');
        addTaskButton.id = 'add-task-btn';
        addTaskButton.textContent = 'Add Task';
        addTaskButton.addEventListener('click', loadAddTaskDialog);

        projectHeader.append(addTaskButton);

        const tasks = getProjectTasks(activeProject.dataset.projectIndex);

        tasks.forEach(task => {
            const div = document.createElement('div');
            div.classList.add('task');
            div.dataset.taskIndex = tasks.indexOf(task);

            const title = document.createElement('p');
            title.classList.add('task-title');
            title.textContent = task.title;

            const priority = document.createElement('p');
            priority.textContent = task.priority;

            switch(task.priority) {
                case 'low': 
                    priority.classList.add('low-priority');
                    break;
                case 'medium':                    
                    priority.classList.add('medium-priority');
                    break;
                case 'high':
                    priority.classList.add('high-priority');
                    break;
            }

            const dueDate = document.createElement('p');
            dueDate.textContent = format(parseISO(task.dueDate), 'MM/dd/yyyy');

            const actionButtons = document.createElement('div');
            actionButtons.classList.add('action-btns');

            const editButton = document.createElement('button');
            editButton.setAttribute('type', 'button');
            editButton.append(
                createIcon(editImage, 'Edit icon', 25, 23)
            );
            editButton.addEventListener('click', editTaskDOM);
            
            const viewButton = document.createElement('button');
            viewButton.setAttribute('type', 'button');
            viewButton.append(
                createIcon(infoImage, 'Info icon', 25, 30)
            );
            viewButton.addEventListener('click', viewTaskDOM);
            
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('type', 'button');
            deleteButton.append(
                createIcon(trashImage, 'Trash icon', 25, 25)
            );
            deleteButton.addEventListener('click', deleteTaskDOM);
            
            actionButtons.append(editButton, viewButton, deleteButton);

            div.append(title, priority, dueDate, actionButtons);
            document.querySelector('#task-container').append(div);
        });
    }
}

function loadAddProjectDialog() {
    const dialog = createDialog('add-project-dialog', 'Add Project');
    const formInputs = dialog.querySelector('.form-inputs');
    const form = dialog.querySelector('form');

    const asterisk = document.createElement('span');
    asterisk.setAttribute('aria-label', 'required');
    asterisk.textContent = ' *';

    const container = document.createElement('p');

    const label = createLabel('title', 'Title');
    label.append(asterisk);

    const input = createInput('text', 'title', 'title');
    input.setAttribute('maxlength', '20');

    container.append(label, input);
    formInputs.append(container);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addProject(e.target.title.value);
        dialog.remove();
        loadProjects();
        removeTasks();
    });
}

function loadAddTaskDialog() {
    const dialog = createDialog('add-task-dialog', 'Add Task');
    const formInputs = dialog.querySelector('.form-inputs');
    const form = dialog.querySelector('form');

    const [titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer] = createTaskDialogInputs();

    formInputs.append(titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer);

    setRadioButton('low_priority');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectIndex = getActiveProject().dataset.projectIndex;
        addTask(
            projectIndex,
            e.target.title.value,
            e.target.description.value,
            e.target.due_date.value,
            e.target.priority.value
        );
        dialog.remove();
        loadTasks();
    });
}

function loadEditTaskDialog(task) {
    const dialog = createDialog('edit-task-dialog', 'Edit Task');
    const formInputs = dialog.querySelector('.form-inputs');
    const form = dialog.querySelector('form');

    const [titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer] = createTaskDialogInputs();

    formInputs.append(titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer);

    setTaskInputValues(task);

    form.addEventListener('submit', (e) => {
        const projectIndex = getActiveProject().dataset.projectIndex;
        const taskIndex = getProjectTasks(projectIndex).indexOf(task);
        e.preventDefault();
        editTask(
            projectIndex,
            taskIndex,
            e.target.title.value,
            e.target.description.value,
            e.target.due_date.value,
            e.target.priority.value
        );
        dialog.remove();
        loadTasks();
    });
}

function loadTaskDetailsDialog(task) {
    const dialog = createDialog('task-details-dialog', 'Task Details');
    const formInputs = dialog.querySelector('.form-inputs');
    const formSubmit = dialog.querySelector('.form-submit');

    const [titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer] = createTaskDialogInputs();

    formInputs.append(titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer);

    setTaskInputValues(task);

    const inputs = dialog.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('disabled', '');
    });

    const textArea = dialog.querySelector('textarea');
    textArea.setAttribute('disabled', '');

    formSubmit.remove();
}

function selectProjectDOM(e) {
    const selectedProject = e.target.closest('.project');
    if (!selectedProject) return;

    const activeProject = getActiveProject();
    if (activeProject) activeProject.classList.remove('active');
    
    selectedProject.classList.add('active');
    loadTasks();
}

function deleteProjectDOM(e) {
    if (!e.target.matches('img')) return; 

    const selectedProject = e.target.closest('.project');
    deleteProject(selectedProject.dataset.projectIndex);

    loadProjects();
}

function editTaskDOM(e) {
    if (!e.target.matches('img')) return; 

    const selectedTask = e.target.closest('.task');
    const activeProject = getActiveProject();
    
    const task = getTask(activeProject.dataset.projectIndex, 
        selectedTask.dataset.taskIndex);

    loadEditTaskDialog(task);
}

function viewTaskDOM(e) {
    if (!e.target.matches('img')) return; 

    const selectedTask = e.target.closest('.task');
    const activeProject = getActiveProject();
    
    const task = getTask(activeProject.dataset.projectIndex, 
        selectedTask.dataset.taskIndex);

    loadTaskDetailsDialog(task);
} 

function deleteTaskDOM(e) {
    if (!e.target.matches('img')) return; 

    const selectedTask = e.target.closest('.task');
    const activeProject = getActiveProject();

    deleteTask(activeProject.dataset.projectIndex, 
        selectedTask.dataset.taskIndex);

    loadTasks();
}

export { 
    loadProjects, 
    loadAddProjectDialog, 
    selectProjectDOM, 
    deleteProjectDOM 
};