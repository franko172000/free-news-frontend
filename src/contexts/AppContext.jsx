import {createContext, useEffect, useState} from "react";
import store from 'store';
import {APP_CATEGORIES, APP_NEWS_PROVIDERS, AUTH_STORAGE_KEY} from "../constants";
import {appSettings, getUser} from "services";

export const AppContext = createContext({});

export const UserProvider = ({children}) => {
    const storage = store.get(AUTH_STORAGE_KEY)
    const appNewsProvider = store.get(APP_NEWS_PROVIDERS) ?? []
    const appCategories = store.get(APP_CATEGORIES) ?? []
    const [appUser, setAppUser] = useState(storage?.user)
    const [newsProviders, setNewsProviders] = useState(appNewsProvider);
    const [categories, setCategories] = useState(appCategories);

    useEffect( ()=>{
        getUserData()
        appSettings()
            .then(res=>{
                const {data} = res.data
                setNewsProviders(data?.providers)
                store.set(APP_NEWS_PROVIDERS,data?.providers)
                store.set(APP_CATEGORIES,data?.categories)
                setCategories(data?.categories)
            })

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
        <AppContext.Provider value={{ appUser, setAppUser, newsProviders, categories }}>
            {children}
        </AppContext.Provider>
    )
}
