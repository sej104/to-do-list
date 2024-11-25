import { closeDialogEventListener, createFormSubmit, createDialog, createLabel, createInput, createFormHeader, createFormInputs, createPriorityInput, createTextArea, createIcon } from './utility.js'
import { getProjects, addProject, deleteProject } from './projectController.js'
import { addTask, deleteTask } from './taskController.js';

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
        const projectTitle = document.querySelector('#project-title');
        projectTitle.textContent = activeProject.textContent;

        const addTaskButton = document.createElement('button');
        addTaskButton.setAttribute('type', 'button');
        addTaskButton.id = 'add-task-btn';
        addTaskButton.textContent = 'Add Task';
        addTaskButton.addEventListener('click', loadAddTaskDialog);
        
        document.querySelector('#project-header').append(addTaskButton);

        const projects = getProjects();
        const tasks = projects[activeProject.dataset.projectIndex].tasks;
        
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
            editButton.dataset.actionType = 'edit';
            editButton.append(
                createIcon('./images/edit.svg', 'Edit icon', 25, 23)
            );
            
            const viewButton = document.createElement('button');
            viewButton.setAttribute('type', 'button');
            viewButton.dataset.actionType = 'view';
            viewButton.append(
                createIcon('./images/info.svg', 'Info icon', 25, 30)
            );
            
            const trashButton = document.createElement('button');
            trashButton.setAttribute('type', 'button');
            trashButton.dataset.actionType = 'delete';
            trashButton.append(
                createIcon('./images/trash.svg', 'Trash icon', 25, 25)
            );
            trashButton.addEventListener('click', clickHandlerDeleteTask);
            
            actionButtons.append(editButton, viewButton, trashButton);

            container.append(title, priority, dueDate, actionButtons);
            document.querySelector('#task-container').append(container);
        });
    }
}

function removeTasks() {
    document.querySelector('#project-title').textContent = 'Select a Project...';

    const addTaskButton = document.querySelector('#add-task-btn');
    if(addTaskButton) addTaskButton.remove();

    document.querySelector('#task-container').textContent = '';
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
    titleInput.setAttribute('maxlength', '20');
    titleContainer.append(titleLabel, titleInput);

    formInputs.append(titleContainer);
    form.append(formHeader, formInputs, formSubmit);
    dialog.append(form);
    document.querySelector('body').append(dialog);

    dialog.showModal();
    closeDialogEventListener(dialog);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addProject(e.target.title.value);
        dialog.remove();
        loadProjects();
        removeTasks();
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
    titleInput.setAttribute('maxlength', '25');
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
        const activeProject = getActiveProject();
        addTask(
            activeProject.dataset.projectIndex,
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
    const selectedProject = e.target.closest('button');
    if (!selectedProject) return;

    const activeProject = getActiveProject();
    if (activeProject) activeProject.classList.remove('active');
    
    selectedProject.classList.add('active');
    loadTasks();
}

function clickHandlerDeleteProject(e) {
    if (!e.target.matches('img')) return; 

    const selectedProject = e.target.closest('button');
    deleteProject(selectedProject.dataset.projectIndex);
    loadProjects();
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
    loadTasks,
    loadAddProjectDialog, 
    loadAddTaskDialog, 
    clickHandlerSelectProject, 
    clickHandlerDeleteProject 
};