import {UseFormRegister} from "react-hook-form";
import {FC} from "react";

interface FieldProps {
    register?: UseFormRegister<any>,
    type: string,
    name: string,
    error?: any,
    title?: string,
    [x:string]: any;
}
const TextField:FC<FieldProps> = ({register, type = "text", name, title, error, ...rest}) => {
    const validations = register ? register(name) : {}
    return (
        <div className="mb-2 w-full">
            <label htmlFor={name}
                   className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
            <input type={type}
                   className={`block w-full rounded-md border-0 py-1.5 px-5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-red-500 sm:text-sm sm:leading-6 ${error ? 'ring-red-500' : ''}`}
                   {...validations}
                   {...rest}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    )
}
export default TextField;
