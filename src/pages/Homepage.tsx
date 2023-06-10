import {useEffect, useState} from 'react'
import Posts from "../components/pages/Posts";
import {useAppProvider} from "../hooks/useAppProvider";
import {getNews} from "../services";
import Header from "../components/pages/Header";

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function Homepage() {
    const {appUser} = useAppProvider()
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);

    useEffect(()=>{
        fetchNews()
    },[])
    const handleFilter = (data: {
        type: string,
        value: string
    }) =>{
       const filtered = data.value === "all" ? news : news.filter((post:any) => {
           switch (data.type){
               case 'category':
                   return post.category.slug === data.value;
               case 'source':
                   return post.source === data.value
           }
           return post
       })
        setFilteredNews(filtered);
    }
    const fetchNews = (searchText?: string) => {
        const isLoggedIn = !!appUser
        getNews(searchText, isLoggedIn).then(res=>{
            const {data} = res.data
            setNews(data)
            setFilteredNews(data)
        })
    }
    const handleSearch = (text:string) => {
        fetchNews(text)
    }
    return (
        <div className="bg-white">
            {/* Header */}
            <Header appUser={appUser} />

            <main>
                {/* Hero section */}
                <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    ARISE NEWS
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                    Find hottest curated news making the round around the world!
                                </p>

                            </div>
                        </div>

                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>

                {/* Feature section */}
                <div className="mt-14 sm:mt-20">
                    <Posts
                        posts={filteredNews}
                        onFilterChange={handleFilter}
                        onSearchField={handleSearch}
                    />
                    <div className="relative overflow-hidden pt-16">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8"></div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="mt-32 bg-gray-900 sm:mt-56" aria-labelledby="footer-heading">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <img
                            className="h-7"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Company name"
                        />
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-white">Categories</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}