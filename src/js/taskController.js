import Task from './Task.js';
import { getProjects } from './projectController.js';

const projects = getProjects();

const addTask = (projectIndex, title, description, dueDate, priority) => {
    projects[projectIndex].tasks.push(
        new Task(title, description, dueDate, priority)
    );
};

const editTask = (projectIndex, taskIndex, title, description, dueDate, priority) => {
    const task = projects[projectIndex].tasks[taskIndex];

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
};

const deleteTask = (projectIndex, taskIndex) => {
    projects[projectIndex].tasks.splice(taskIndex, 1);
};

const printProjectTasks = (projectIndex) => {
    const project = projects[projectIndex];

    if (!project || !project.tasks.length) return;

    console.log(`${project.title}:`);
    for (let task of project.tasks) {
        console.log(`${task.title}`);
    }

    console.log('');
}

const printTaskDetails = (projectIndex, taskIndex) => {
    const task = projects[projectIndex].tasks[taskIndex];

    if (!task) return;

    console.log(`${task.title} task details:`);
    for (let prop in task) {
        console.log(`${prop}: ${task[prop]}`);
    }

    console.log('');
};

const getProjectTasks = (projectIndex) => {
    const project = projects[projectIndex];

    if (!project || !project.tasks.length) return;

    return project.tasks;
}

const getTask = (projectIndex, taskIndex) => {
    return projects[projectIndex].tasks[taskIndex];
}

export { 
    addTask, 
    editTask, 
    deleteTask, 
    printProjectTasks, 
    printTaskDetails, 
    getProjectTasks,
    getTask
};