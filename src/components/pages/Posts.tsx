import {useAppProvider} from "../../hooks/useAppProvider";
import {Link} from "react-router-dom";
import Button from "../Button";
import TextField from "../TextField";
import Select from "../Select";
import {useState} from "react";
import moment from 'moment';
import Pagination from "../Pagination";

const nyTimesDomain = 'https://www.nytimes.com/';
interface PostsInterface {
    posts: any,
    onFilterChange?: (filter:{
        type: string,
        value: string
    })=>void
    onSearchField?: (text: string)=>void,
}
export default function Posts({posts = [], onFilterChange, onSearchField} : PostsInterface) {
    const {newsProviders, categories} = useAppProvider()
    const [providers] = useState(Object.values(newsProviders));
    const [postCategories] = useState(categories);
    const [searchField, setSearchField] = useState("");

    const handleSearchField = (e: any) =>{
        setSearchField(e.target.value)
    }

    const search = async () =>{
        onSearchField?.(searchField)
    }

    const handleCategoryChange = (e :any) => {
        onFilterChange?.(filterData('category', e.target.value))
    }

    const handleDateFilterChange = (e :any) => {
        console.log(e.target.value)
        onFilterChange?.(filterData('date', e.target.value))
    }

    const handleSourceChange = (e :any) => {
        const value = e.target.value;
        let source = "all"
        if(value !== "" && value !== "all"){
            source = Object.keys(newsProviders)[providers.indexOf(e.target.value)]
        }
        onFilterChange?.(filterData('source', source))
    }

    const filterData = (type: string, value: string)=>{
       return {
           type,
           value: value === '' ? 'all' : value
       }
    }

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest News</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Learn how to grow your business with our expert advice.
                </p>
            </div>
            <div className="bg-white shadow mt-16 sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <form className="mt-5 sm:flex sm:flex-col items-center">
                        <div className="flex sm:w-1/2 w-full items-center ">
                            <div className="flex flex-col sm:flex-row w-full ">
                                <div className="sm:w-4/5 w-full">
                                    <TextField
                                        name="name"
                                        type="text"
                                        placeholder="Enter keyword to find news"
                                        onChange={handleSearchField}
                                    />
                                </div>
                                <Button title="Search" type="button" styleNames="sm:w-2/6 w-full ml-0 sm:ml-5" onClick={search} />
                            </div>
                        </div>
                        <p className="my-5 sm:mx-0">Filters:</p>
                        <div className="flex flex-col sm:flex-row justify-start sm:justify-between mt-5">
                            <div className="mx-0 sm:mx-5">
                                <Select
                                    name="categories"
                                    onChange={handleCategoryChange}
                                    defaultValue=""
                                >
                                    <option value="">Filter by category</option>
                                    <option value="all">All</option>
                                    {postCategories.map((category: any, index: number) => (
                                        <option value={category.slug} key={index}>{category.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="mx-0 sm:mx-5">
                                <TextField
                                    name="name"
                                    type="date"
                                    placeholder="Enter keyword to find news"
                                    onChange={handleDateFilterChange}
                                />
                            </div>
                            <div className="mx-0 sm:mx-5">
                                <Select
                                    name="source"
                                    onChange={handleSourceChange}
                                    defaultValue=""
                                >
                                    <option value="">Filter by source</option>
                                    <option value="all">All</option>
                                    {providers.map((provider: any, index: number) => (
                                        <option key={index}>{provider}</option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post: any) => (
                    <article key={post?.id} className="flex flex-col items-start justify-between">
                        <Link to={post.content_url}>
                            <div className="relative w-full">
                                <img
                                    src={post.source === 'ny-times' ? nyTimesDomain + post?.featured_image : post?.featured_image }
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.created_at} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <span
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                    {post.category.name}
                                </span>
                                <span
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {'Source: '+ newsProviders[post.source]}
                                </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <span>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </span>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80" alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <span>
                                                <span className="absolute inset-0" />
                                                {post?.author ?? 'Arise News'}
                                            </span>
                                        </p>
                                        <p className="text-gray-600">{'Posted: '+ moment(post.created_at).format('ll')}</p>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}
