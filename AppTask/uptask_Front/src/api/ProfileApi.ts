import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { NewCurrentPasswordForm, UserProfileForm } from "../types"

export async function updateProfile(formData : UserProfileForm) {
    try {
        const response = await api.put<string>('/auth/profile', formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateCurrentPassword(formData : NewCurrentPasswordForm) {
    try {
        const response = await api.post<string>('/auth/update-password', formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}