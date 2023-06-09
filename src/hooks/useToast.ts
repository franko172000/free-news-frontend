import {useToasts} from "react-toast-notifications";

export type toastTypes = 'error' | 'info' | 'success' | 'warning';
export const useToast = () => {
    const { addToast } = useToasts();
    return (type: toastTypes, message: string) =>{
        addToast(message, {
            appearance: type,
            autoDismiss: true,
            autoDismissTimeout: 10000,
        });
    }
}