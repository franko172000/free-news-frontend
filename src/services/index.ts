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