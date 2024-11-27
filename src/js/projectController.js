import Project from "./Project.js";

if (!localStorage.length) {
    const arr = [new Project('Default')];
    localStorage.setItem("projects", JSON.stringify(arr));
}

const projects = JSON.parse(localStorage.getItem("projects"));

const getProjects = () => projects;

const updateLocalStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
}

const addProject = (name) => {
    projects.push(new Project(name));
    updateLocalStorage();
}

const deleteProject = (index) => {
    projects.splice(index, 1);
    updateLocalStorage();
}

export {
    getProjects, 
    addProject,
    deleteProject,
    updateLocalStorage
};
