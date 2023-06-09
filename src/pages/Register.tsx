import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useToast} from "../hooks/useToast";
import {register as createUserService} from "services";
import TextField from "../components/TextField";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "../constants";

export default function Register() {
    const [loading, setLoading] = useState(false)
    const formValidationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('email is invalid'),
        password: Yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(formValidationSchema)};
    const { register, handleSubmit, reset, formState, getValues } = useForm(formOptions);
    const { errors } = formState;
    const toast = useToast();
    const navigate = useNavigate();

    const registerUser = async (data: any)=>{
        setLoading(true);
        try{
            await createUserService(data)
            toast('success',"Registration was successful!");
            navigate(DASHBOARD_ROUTE)
        }catch (err: any){
            toast('error', err?.data?.error?.message);
        }
        setLoading(false);
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(registerUser)}>
                            <div>
                                <TextField
                                    title="Name"
                                    name="name"
                                    register={register}
                                    type="text"
                                    error={errors?.name?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    title="Email"
                                    name="email"
                                    register={register}
                                    type="email"
                                    error={errors?.email?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    title="Password"
                                    name="password"
                                    register={register}
                                    type="password"
                                    error={errors?.password?.message}
                                />
                            </div>

                            <div>
                                <Button title="Register" type="submit" loading={loading} />
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <Link to={LOGIN_ROUTE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
