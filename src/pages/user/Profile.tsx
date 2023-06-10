import ContentArea from "components/user/ContentArea";
import TextField from "components/TextField";
import Button from "components/Button";
import {useState} from "react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useToast} from "hooks/useToast";
import {updateProfile} from "services";
import {useAppProvider} from "../../hooks/useAppProvider";
import store from 'store';
import {AUTH_STORAGE_KEY} from "../../constants";

export default function Profile(){
    const [loading, setLoading] = useState(false)
    const {appUser, setAppUser} = useAppProvider()
    const formValidationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('email is invalid'),
    });
    const formOptions = { resolver: yupResolver(formValidationSchema)};
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const toast = useToast();

    const updateUser = async (data: any)=>{
        setLoading(true);
        try{
            await updateProfile(data)
            const {name, email} = data
            const storage = store.get(AUTH_STORAGE_KEY)
            storage.user.name = name
            storage.user.email = email
            store.set(AUTH_STORAGE_KEY, storage)
            setAppUser({
                ...appUser,
                name,
                email
            })
            toast('success',"Profile update was successful!");
        }catch (err: any){
            toast('error', err?.data?.error?.message);
        }
        setLoading(false);
    }
    return (
        <ContentArea title="Edit Profile">
            <div className="my-14">
                <div className="sm:w-full sm:max-w-[480px]">
                    <div className="bg-white">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(updateUser)}>
                            <div>
                                <TextField
                                    title="Name"
                                    name="name"
                                    register={register}
                                    type="text"
                                    error={errors?.name?.message}
                                    defaultValue={appUser.name}
                                />
                            </div>

                            <div>
                                <TextField
                                    title="Email"
                                    name="email"
                                    register={register}
                                    type="email"
                                    error={errors?.email?.message}
                                    defaultValue={appUser.email}
                                />
                            </div>

                            <div>
                                <Button title="Update profile" type="submit" loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ContentArea>
    )
}