import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {useMemo, useState} from "react";
import {classNames} from "../helper";
interface PaginationInterface {
    total: number,
    perPage?: number,
    currentPage: number,
    onPageChange?: (page: number)=>void,
}
export default function Pagination({total, perPage, onPageChange, currentPage} : PaginationInterface) {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(currentPage);
    useMemo(()=>{
        setPageCount(Math.ceil(total/(perPage || 10)))
    },[total, perPage])
    const previous = ()=>{
        onPageChange?.(currentPage > 1 ? currentPage - 1 : currentPage)
    }

    const nextPage = ()=>{
        onPageChange?.(currentPage < pageCount ? currentPage + 1 : pageCount)
    }
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
            <div className="flex flex-1 justify-between sm:hidden">
                <span
                    onClick={previous}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    Previous
                </span>
                <span
                    onClick={nextPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    Next
                </span>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> of <span className="font-medium">{total+ ' '}</span>results {' '}
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <span
                            onClick={previous}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {
                            [...Array(pageCount)].map((val:number, index: number) => {
                                let page = index + 1;
                                return (
                                    <div key={index}>
                                        <span
                                            aria-current="page"
                                            onClick={()=>onPageChange?.(page)}
                                            className={classNames('relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex cursor-pointer',
                                                page === currentPage ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'text-gray-900')}
                                        >
                                            {page}
                                        </span>
                                    </div>
                                )
                            })
                        }

                        <span
                            onClick={nextPage}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    )
}