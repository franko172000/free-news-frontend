import {useContext} from "react";
import {UserContext} from "contexts/userContext";

export const useAuthUser = () => {
    const {appUser, setAppUser} = useContext<any>(UserContext)
    return {
        appUser,
        setAppUser
    }
}
