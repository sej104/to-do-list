import { Project } from "./Project.js";

const projects = [new Project('Default')];

const getProjects = () => projects;

const addProject = (name) => {
    projects.push(new Project(name));
}

const deleteProject = (index) => {
    projects.splice(index, 1);
}

const printProjects = () => {
    console.log('Projects:')
    for (let project of projects) {
        console.log(`${project.title}`);
    }
    console.log('');
}

export {
    getProjects, 
    addProject,
    deleteProject,
    printProjects 
};
