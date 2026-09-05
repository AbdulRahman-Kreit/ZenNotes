import { Outlet, NavLink } from 'react-router-dom';

const links = [
    { id: 1, name: 'All Notes', href: '/', icon: "fa-solid fa-note-sticky" },
    { id: 2, name: 'Favorites', href: '/favorites', icon: "fa-solid fa-heart" },
    { id: 3, name: 'Customizations', href: '/customizations', icon: "fa-solid fa-paintbrush" },
];

const linksStyle = `p-4 hover:bg-gray-700 rounded-md text-[16px] md:text-xl font-medium`;

export default function MainLayout() {

    return (
        <main className="flex min-h-screen w-full mx-auto">
            {/* Sidebar */}
            <aside className="w-80 p-8 border-r-2 border-zinc-700/90 
            hidden md:flex flex-col justify-between">
                <div className='mt-12'>
                    <h2 className='text-lg md:text-4xl font-bold mb-16 ml-4'>
                        ZenNotes
                    </h2>
                    <nav className="flex flex-col gap-4">
                        {links.map((link) => {
                            return(
                                <NavLink key={link.id} to={link.href} className={linksStyle}>
                                    <i className={`${link.icon} mr-2`}></i>{link.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </main>
    )
}
