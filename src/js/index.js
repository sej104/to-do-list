import '../styles.css';
import { 
    loadProjects, loadAddProjectDialog, selectProjectDOM, deleteProjectDOM 
} from './screenController.js';

const addProjectButton = document.querySelector('#add-project-btn');
const projectContainer = document.querySelector('#project-container');

addProjectButton.addEventListener('click', loadAddProjectDialog);
projectContainer.addEventListener('click', deleteProjectDOM);
projectContainer.addEventListener('click', selectProjectDOM);

loadProjects();