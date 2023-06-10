import {UseFormRegister} from "react-hook-form";

export interface LoginData {
    email: string,
    password: string
}

export interface RegisterData extends LoginData{
    name:string
}

export interface FieldProps {
    register?: UseFormRegister<any>,
    type: string,
    name: string,
    error?: any,
    title?: string,
    [x:string]: any;
}