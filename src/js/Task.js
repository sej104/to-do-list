import { format } from "date-fns";

class Task {
    constructor(title, description, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(), 'MM/dd/yyyy');
        this.priority = priority;
    }
}

export { Task };