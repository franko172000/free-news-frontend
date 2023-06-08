export default function ContentArea ({ title, children }:{
    title:string, children?:any
}){
    return (
        <>
            <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{title}</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
            </main>
        </>
    )
}