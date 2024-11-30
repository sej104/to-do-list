import Task from './Task.js';
import { getProjects, updateLocalStorage } from './projectController.js';

const projects = getProjects();

const addTask = (projectIndex, title, description, dueDate, priority) => {
    getProjectTasks(projectIndex).push(
        new Task(title, description, dueDate, priority)
    );
    updateLocalStorage();
};

const editTask = (projectIndex, taskIndex, title, description,
    dueDate, priority) => {
        const task = getTask(projectIndex, taskIndex);
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        updateLocalStorage();
};

const deleteTask = (projectIndex, taskIndex) => {
    getProjectTasks(projectIndex).splice(taskIndex, 1);
    updateLocalStorage();
};

const getProjectTasks = (projectIndex) => {
    return projects[projectIndex].tasks;
}

const getTask = (projectIndex, taskIndex) => {
    return projects[projectIndex].tasks[taskIndex];
}

export { 
    addTask, 
    editTask, 
    deleteTask, 
    getProjectTasks,
    getTask
};