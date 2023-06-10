import {FC} from "react";
import {FieldProps} from "interfaces/services";

interface SelectFieldProps extends Omit<FieldProps, 'type'>{
    children: any
}
const Select:FC<SelectFieldProps> = ({children, name, register, title, error, ...rest})=>{
    const validations = register ? register(name) : {}
    return (
        <div className="mb-2 w-full">
            {title && ( <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{title}</label> )}
            <select
                name={name}
                className="h-12 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...validations}
                {...rest}
            >
                {children}
            </select>
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>

    )
}
export default Select