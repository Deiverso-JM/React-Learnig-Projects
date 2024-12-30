import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, TeamMember, TeamMemberForm } from "../types"

export async function findUserById({ email, projectId }: { email: TeamMemberForm, projectId: Project['_id'] }) {
    try {
        const response = await api.post(`/projects/${projectId}/team/find`, email)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserTeam({ id, projectId }: { id: TeamMember['_id'], projectId: Project['_id'] }) {
    try {
        const response = await api.post(`/projects/${projectId}/team`, { id })
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserTeam({ userId, projectId }: { userId: TeamMember['_id'], projectId: Project['_id'] }) {
    try {
        const response = await api.delete(`/projects/${projectId}/team/${userId}`)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUsersTeam(projectId: Project['_id'] ) {
    try {
        const response = await api.get(`/projects/${projectId}/team`)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}