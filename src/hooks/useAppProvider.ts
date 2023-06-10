import {useContext} from "react";
import {AppContext} from "contexts/AppContext";

export const useAppProvider = () => {
    const {appUser, setAppUser, newsProviders, categories} = useContext<any>(AppContext)
    return {
        appUser,
        setAppUser,
        newsProviders,
        categories
    }
}
