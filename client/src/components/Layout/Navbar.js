import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    console.log(location.pathname)

    const navPages = [
        {url: "/home", name: "Home"}, {url: "/loans", name: "Loans"}
    ]
    return(
        <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/home" className="flex items-center">
                    <img src="/bookish-icon.png" className="h-8 mr-3" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookish</span>
                </a>
                <button data-collapse-toggle="navbar-dropdown" type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {navPages.map((page, index) => (
                        <li key={index}>
                            <a href={page.url}
                               className={`block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent ${page.url === location.pathname ? 'text-blue-700' : 'text-black'} md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                               aria-current="page">{page.name}</a>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar