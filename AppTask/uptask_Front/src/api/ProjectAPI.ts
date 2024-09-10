import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, ProjectFormData } from "@/types/index";

export async function createProject(dataForm: ProjectFormData) {
    console.log(dataForm)
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
        if(validateShema.success) return validateShema.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}