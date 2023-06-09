import {createContext, useEffect, useState} from "react";
import store from 'store';
import {AUTH_STORAGE_KEY} from "../constants";
import {getUser} from "../services";

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const storage = store.get(AUTH_STORAGE_KEY)
    const [appUser, setAppUser] = useState(storage?.user)
    useEffect( ()=>{
        getUserData()
    },[]);

    const getUserData = async () =>{
        if(!storage?.user){
            try{
                const res = await getUser()
                const user = res.data.data
                setAppUser(user)
                storage.user = user
                store.set(AUTH_STORAGE_KEY, storage);
            }catch (err){}
        }
    }
    return (
        <UserContext.Provider value={{ appUser, setAppUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
