// import '../styles.css';
import {  loadProjects, loadTasks, loadAddProjectDialog, loadAddTaskDialog, clickHandlerSelectProject, clickHandlerDeleteProject } from './ScreenController.js';

const addProjectButton = document.querySelector('#add-project-btn');
const addTaskButton = document.querySelector('#add-task-btn');
const projectContainer = document.querySelector('#project-container');
const addTaskDialog = document.querySelector('#add-task-dialog');

addProjectButton.addEventListener('click', loadAddProjectDialog);
projectContainer.addEventListener('click', clickHandlerDeleteProject);
projectContainer.addEventListener('click', clickHandlerSelectProject);

loadProjects();