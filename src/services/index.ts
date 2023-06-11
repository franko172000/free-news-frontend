import apiClient from "./axios";
import {LoginData, RegisterData} from "interfaces/services";

export const login = async (data: LoginData)=> {
    return apiClient.post( 'auth/login', data);
}

export const logout = async ()=> {
    return apiClient.post( 'auth/logout');
}

export const register = async (data: RegisterData)=> {
    return apiClient.post( 'auth/register', data);
}

export const getUser = async ()=> {
    return apiClient.get( 'user/me');
}

export const updateProfile = async (data: RegisterData)=> {
    return apiClient.put( 'user/profile', data);
}


export const updatePreference = async ({categories, sources} : {
    categories?: [],
    sources?: []
})=> {
    return apiClient.put( `user/preference`, {
        categories,
        sources
    });
}
export const appSettings = async ()=> {
    return apiClient.get( 'app-settings');
}

export const getNews = async (params?: {
    term?: string,
    page?: number,
}, isUserLoggedIn: boolean = false)=> {
    return apiClient.get( `${isUserLoggedIn ? 'user/' : ''}news`, {
        params
    });
}