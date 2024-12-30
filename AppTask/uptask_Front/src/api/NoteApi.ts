import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project } from "../types";

type NoteAPIType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Project['_id']
    noteId?: Note['_id']
}

export async function createNote({ projectId, taskId, formData }: NoteAPIType) {
    try {
        const response = await api.post<string>(`/projects/${projectId}/task/${taskId}/notes`, formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const response = await api.delete<string>(`/projects/${projectId}/task/${taskId}/notes/${noteId}`)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}