import { getProjects, addProject, deleteProject } from './projectController.js';
import { addTask, editTask, deleteTask, getProjectTasks, getTask } from './taskController.js';
import { createDialog, createLabel, createInput, createPriorityContainer, 
    createTextArea, createIcon, setRadioButton } from './utility.js'

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
        button.setAttribute('type', 'button');
        button.classList.add('project');
        button.dataset.projectIndex = projects.indexOf(project);

        const projectTitle = document.createElement('span');
        projectTitle.textContent = project.title;
        
        const trashIcon = createIcon('./images/trash.svg', 
            'Trash icon', 25, 25);

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
            const container = document.createElement('div');
            container.classList.add('task');
            container.dataset.taskIndex = tasks.indexOf(task);

            const title = document.createElement('p');
            title.textContent = task.title;
            title.classList.add('task-title');

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
            dueDate.textContent = task.dueDate;

            const actionButtons = document.createElement('div');
            actionButtons.classList.add('action-btns');

            const editButton = document.createElement('button');
            editButton.setAttribute('type', 'button');
            editButton.append(
                createIcon('./images/edit.svg', 'Edit icon', 25, 23)
            );
            editButton.addEventListener('click', clickHandlerEditTask);
            
            const viewButton = document.createElement('button');
            viewButton.setAttribute('type', 'button');
            viewButton.append(
                createIcon('./images/info.svg', 'Info icon', 25, 30)
            );
            
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('type', 'button');
            deleteButton.append(
                createIcon('./images/trash.svg', 'Trash icon', 25, 25)
            );
            deleteButton.addEventListener('click', clickHandlerDeleteTask);
            
            actionButtons.append(editButton, viewButton, deleteButton);

            container.append(title, priority, dueDate, actionButtons);
            document.querySelector('#task-container').append(container);
        });
    }
}

function removeTasks() {
    const projectTitle = document.querySelector('#project-title');
    projectTitle.textContent = 'Select a Project...';

    const addTaskButton = document.querySelector('#add-task-btn');
    if (addTaskButton) addTaskButton.remove();

    const taskContainer = document.querySelector('#task-container');
    taskContainer.textContent = '';
}

function loadAddProjectDialog() {
    const dialog = createDialog('add-project-dialog', 'Add Project');
    const formInputs = dialog.querySelector('.form-inputs');
    const form = dialog.querySelector('form');

    const titleContainer = document.createElement('p');
    const titleLabel = createLabel('title', 'Title');
    const titleInput = createInput('text', 'title', 'title');
    titleInput.setAttribute('maxlength', '20');
    titleContainer.append(titleLabel, titleInput);

    formInputs.append(titleContainer);

    form.addEventListener("submit", (e) => {
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

    const titleContainer = document.createElement('p');
    const titleLabel = createLabel('title', 'Title')
    const titleInput = createInput('text', 'title', 'title');
    titleInput.setAttribute('maxlength', '25');
    titleContainer.append(titleLabel, titleInput);

    const descriptionContainer = document.createElement('p');
    const descriptionLabel = createLabel('description', 'Description');
    const descriptionInput = createTextArea('description');
    descriptionContainer.append(descriptionLabel, descriptionInput);

    const dueDateContainer = document.createElement('p');
    const dueDateLabel = createLabel('due_date', 'Due Date');
    const dueDateInput = createInput('date', 'due_date', 'due_date');
    dueDateContainer.append(dueDateLabel, dueDateInput);

    const priorityContainer = createPriorityContainer();

    formInputs.append(titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer);

    setRadioButton('low_priority');

    form.addEventListener("submit", (e) => {
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

    const titleContainer = document.createElement('p');
    const titleLabel = createLabel('title', 'Title')
    const titleInput = createInput('text', 'title', 'title', task.title);
    titleInput.setAttribute('maxlength', '25');
    titleContainer.append(titleLabel, titleInput);

    const descriptionContainer = document.createElement('p');
    const descriptionLabel = createLabel('description', 'Description');
    const descriptionInput = createTextArea('description', task.description);
    descriptionContainer.append(descriptionLabel, descriptionInput);

    const dueDateContainer = document.createElement('p');
    const dueDateLabel = createLabel('due_date', 'Due Date');
    const dueDateInput = createInput('date', 'due_date', 
        'due_date', task.dueDate);
    dueDateContainer.append(dueDateLabel, dueDateInput);

    const priorityContainer = createPriorityContainer();

    formInputs.append(titleContainer, descriptionContainer, 
        dueDateContainer, priorityContainer);

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

    form.addEventListener("submit", (e) => {
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

function clickHandlerSelectProject(e) {
    const selectedProject = e.target.closest('.project');
    if (!selectedProject) return;

    const activeProject = getActiveProject();
    if (activeProject) activeProject.classList.remove('active');
    
    selectedProject.classList.add('active');
    
    loadTasks();
}

function clickHandlerDeleteProject(e) {
    if (!e.target.matches('img')) return; 

    const selectedProject = e.target.closest('.project');
    deleteProject(selectedProject.dataset.projectIndex);

    loadProjects();
}

function clickHandlerEditTask(e) {
    if (!e.target.matches('img')) return; 

    const selectedTask = e.target.closest('.task');
    const activeProject = getActiveProject();
    
    const task = getTask(activeProject.dataset.projectIndex, 
        selectedTask.dataset.taskIndex);

    loadEditTaskDialog(task);
}

function clickHandlerDeleteTask(e) {
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
    clickHandlerSelectProject, 
    clickHandlerDeleteProject 
};