import Loader from "assets/Loader";
import {FC} from "react";
import {classNames} from "../helper";

interface Props {
    title: string,
    loading?: boolean,
    styleNames?: any,
    [x:string]: any;
}

const Button:FC<Props> = ({title, loading,styleNames, ...rest})=>{
    return(
        <button
            className={classNames("flex w-full justify-center items-center rounded-md bg-indigo-600 h-12 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", styleNames )}
            {...rest}
        >
            {title} {loading && <Loader />}
        </button>
    )
}
export default Button