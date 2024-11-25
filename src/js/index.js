// import '../styles.css';
import { loadProjects, loadAddProjectDialog, clickHandlerSelectProject, 
    clickHandlerDeleteProject } from './ScreenController.js';

const addProjectButton = document.querySelector('#add-project-btn');
const projectContainer = document.querySelector('#project-container');

addProjectButton.addEventListener('click', loadAddProjectDialog);
projectContainer.addEventListener('click', clickHandlerDeleteProject);
projectContainer.addEventListener('click', clickHandlerSelectProject);

loadProjects();