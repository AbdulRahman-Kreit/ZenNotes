import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const links = [
    { id: 1, name: 'All Notes', href: '/', icon: "fa-solid fa-note-sticky" },
    { id: 2, name: 'Favorites', href: '/favorites', icon: "fa-solid fa-heart" },
    { id: 3, name: 'Customizations', href: '/customizations', icon: "fa-solid fa-paintbrush" },
];

const linksStyle = `nav-link p-4 rounded-md text-[16px] md:text-xl font-medium flex items-center`;

export default function MainLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <main className="flex flex-col md:flex-row min-h-screen w-full mx-auto relative">
            {/* Mobile Top Navigation Bar */}
            <header className="flex md:hidden items-center justify-between p-4 border-b border-zinc-300 dark:border-zinc-700/90 w-full bg-(--bg-color) sticky top-0 z-40">
                <h2 className="text-xl font-bold heading">ZenNotes</h2>
                <button 
                    onClick={toggleMobileMenu}
                    className="p-2 text-2xl accent-text focus:outline-none"
                    aria-label="Toggle Navigation Menu"
                >
                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </button>
            </header>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-full md:w-80 p-6 md:p-8 border-r-0 md:border-r-2 border-zinc-300 dark:border-zinc-700/90 
                flex flex-col justify-between fixed md:relative top-0 left-0 h-full md:h-auto z-50 md:z-auto 
                transition-transform duration-300 ease-in-out bg-(--bg-color)
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className='mt-4 md:mt-12'>
                    <div className="flex items-center justify-between mb-8 md:mb-16">
                        <h2 className='text-2xl md:text-4xl font-bold ml-2 md:ml-4 heading'>
                            ZenNotes
                        </h2>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden text-2xl p-2 accent-text"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-3 md:gap-4">
                        {links.map((link) => {
                            return(
                                <NavLink 
                                    key={link.id} 
                                    to={link.href} 
                                    className={linksStyle}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <i className={`${link.icon} mr-3`}></i>{link.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
                <Outlet />
            </div>
        </main>
    )
}