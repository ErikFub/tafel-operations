import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    // Adapted from https://flowbite.com/docs/components/sidebar/
    let navigation = [
        ['Home', '/'],
        ['Customers', '/customers'],
        ['Suppliers', '/suppliers'],
    ]
    return (
        <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <a href="/" class="flex items-center pl-2.5 mb-5">
                    <img src="https://www.tafel.de/fileadmin/media/Ueber_uns/Aktuelle_Meldungen/2019/2019-05-13_Tafel-App.png" class="h-6 mr-3 sm:h-7" alt="Tafel Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tafel Operations</span>
                </a>
                <ul class="space-y-2 font-medium">
                    {navigation.map(([title, url]) => (
                    <li>
                        <NavLink id={title} to={url} className={"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" + (url === window.location.pathname ? " font-bold" : "")}>
                            <span class="ml-3">{title}</span>
                        </NavLink>
                    </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}