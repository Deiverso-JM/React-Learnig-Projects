import api from "@/lib/axios";
import { UserRegistrationForm } from "../types";
import { isAxiosError } from "axios";


export async function createAccount(formData: UserRegistrationForm) {
    try {
        const response = await api.post<string>('/auth/create-account', formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmToken(token: string) {
    try {
        const response = await api.post<string>('/auth/confirm-account', {token} )
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error)
        }
    }
}