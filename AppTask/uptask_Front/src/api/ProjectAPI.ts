import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "@/types/index";
import { ProjectAPIType } from "@/types/generalTypes";


export async function createProject(dataForm: ProjectFormData) {
    try {
        const response = await api.post('/projects/', dataForm)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllProjects() {
    try {
        const response = await api.get('/projects/')
        const validateShema = dashboardProjectSchema.safeParse(response.data)
        if (validateShema.success) return validateShema.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function getProyectById(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)
        const respose = editProjectSchema.safeParse(data)
        if(respose.success) return respose.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullProyect(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)
        const respose = projectSchema.safeParse(data)
        if(respose.success) return respose.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProject({ projectId, data }: ProjectAPIType) {

    try {
        const response = await api.put(`/projects/${projectId}`, data)
        return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteProject(id: Project['_id']) {
    try {
        const { data } = await api.delete(`/projects/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
