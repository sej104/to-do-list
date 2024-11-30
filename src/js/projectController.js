import Project from "./Project.js";

if (!localStorage.length) {
    const project = new Project('Default');
    localStorage.setItem("projects", JSON.stringify([project]));
}

const projects = JSON.parse(localStorage.getItem("projects"));

const getProjects = () => {
    return projects;
}

const updateLocalStorage = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}

const addProject = (name) => {
    projects.push(new Project(name));
    updateLocalStorage();
}

const deleteProject = (index) => {
    projects.splice(index, 1);
    updateLocalStorage();
    if (!projects.length) addProject('Default');
}

export {
    getProjects, 
    addProject,
    deleteProject,
    updateLocalStorage
};
