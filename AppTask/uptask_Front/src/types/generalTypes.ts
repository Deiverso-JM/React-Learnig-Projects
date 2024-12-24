import { Project, ProjectFormData, Task, TaskFormData } from ".";

export type ProjectAPIType = {
    projectId: Project['_id'];
    data: ProjectFormData;
}

export type TaskApiType = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    status: Task['status']
}