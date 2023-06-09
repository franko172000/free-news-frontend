import * as Yup from 'yup';
import TextField from "components/TextField";
import Button from "components/Button";
import {useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from "react-hook-form";
import {login} from "services";
import {useToast} from "../hooks/useToast";
import {Link, useNavigate} from "react-router-dom";
import {DASHBOARD_ROUTE, REGISTER_ROUTE, AUTH_STORAGE_KEY} from "../constants";
import store from "store";



export default function Login() {
    const [loading, setLoading] = useState(false)
    const formValidationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(formValidationSchema)};
    const { register, handleSubmit, reset, formState, getValues } = useForm(formOptions);
    const { errors } = formState;
    const toast = useToast();
    //const { register, handleSubmit, reset,
    // formState, errors } = useValidationHook(formValidationSchema);

    const submitForm = async (data: any)=>{
        setLoading(true);
        try{
            const res = await login(data)
            window.location.href = DASHBOARD_ROUTE
            store.set(AUTH_STORAGE_KEY, {
                token: res.data.data.token
            })
            toast('success',"Login successful!");
        }catch (err: any){
            toast('error', err?.data?.error?.message);
        }
        setLoading(false);
    }
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(submitForm)}>
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm leading-6">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button title="Login" type="submit" loading={loading} />
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={REGISTER_ROUTE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
