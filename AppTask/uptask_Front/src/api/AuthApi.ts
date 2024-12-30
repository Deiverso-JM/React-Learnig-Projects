import api from "@/lib/axios";
import {
    CheckPasswordForm,
    ConfirmToken,
    ForgotPasswordForm,
    NewPasswordForm,
    RequestConfirmationCodeForm,
    User,
    UserLoginForm,
    UserRegistrationForm,
} from "../types";
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


export async function requestCode(formData: RequestConfirmationCodeForm) {
    try {
        const response = await api.post<string>('/auth/request-code', formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestLogin(formData: UserLoginForm) {
    try {
        const response = await api.post<string>('/auth/login', formData)
        const { data } = response
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function confirmToken(token: string) {
    try {
        const response = await api.post<string>('/auth/confirm-account', { token })
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function requestForgorPassword(email: ForgotPasswordForm) {
    try {
        const response = await api.post<string>('/auth/forgot-password', email)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function validateToken(token: ConfirmToken['token']) {
    try {
        const response = await api.post<string>('/auth/validate-token', { token })
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updatePassword(newData: { token: ConfirmToken['token'], formData: NewPasswordForm }) {
    try {
        const response = await api.post<string>(`/auth/update-password/${newData.token}`, newData.formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const response = await api.get<User>('/auth/user')
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function checkPassword(formData : CheckPasswordForm) {
    try {
        const response = await api.post<string>('/auth/check-password', formData)
        const { data } = response
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
    
}