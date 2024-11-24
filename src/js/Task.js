import { format } from "date-fns";

class Task {
    constructor(title, dueDate, description, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'MM/dd/yyyy');
        this.priority = priority;
    }
}

export { Task };