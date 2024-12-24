import { isAxiosError } from "axios";
// import { Project, Task, TaskFormData } from "../types";
import api from "@/lib/axios";
import { TaskApiType } from "@/types/generalTypes";
import { taskSchema } from "../types";

export async function createTask({ formData, projectId }: Pick<TaskApiType, 'formData' | 'projectId'>) {
  try {
    const response = await api.post(`/projects/${projectId}/tasks`, formData)
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }

}

export async function getTaskById({ projectId, taskId }: Pick<TaskApiType, 'projectId' | 'taskId'>) {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);
    const response = taskSchema.safeParse(data)
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function updateTaskId({ formData, taskId, projectId }: Pick<TaskApiType, 'formData' | 'taskId' | 'projectId'>) {
  try {
    const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }

}

export async function deleteTaskById({ projectId, taskId }: Pick<TaskApiType, 'projectId' | 'taskId'>) {
  try {
    const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
}


export async function updateTaskStatus({ projectId, taskId, status }: Pick<TaskApiType, 'projectId' | 'taskId' | 'status'>) {

  try {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}/status`, { status });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
}
