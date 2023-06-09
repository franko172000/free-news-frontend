import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, useFieldArray} from "react-hook-form";

export const useValidationHook = (rules: any)=>{
    const formValidationSchema = Yup.object().shape(rules);
    const formOptions = { resolver: yupResolver(formValidationSchema)};
    const { register, handleSubmit, reset, formState, setValue, control } = useForm(formOptions);
    // get functions to build form with useForm() hook
    const { errors } = formState;
    return{
        formOptions,
        register,
        handleSubmit,
        reset,
        formState,
        errors,
        setValue,
        control,
        useFieldArray
    }
}
