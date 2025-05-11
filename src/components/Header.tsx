import { useState, useEffect } from "react";
import { Link } from "react-router";

//  Header/Navbar 
export default function Header() {
    const [hiddeMenu, setHiddeMenu] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const navLinks = [
        { href: "/acerca", icon: "fas fa-user", label: "Sobre mí" },
        { href: "/habilidades", icon: "fas fa-lightbulb", label: "Habilidades" },
        { href: "/proyectos", icon: "fas fa-folder-open", label: "Proyectos" },
        { href: "/contacto", icon: "fas fa-envelope", label: "Contacto" }
    ];

    const showMenu = () => {
        setHiddeMenu(!hiddeMenu);
    };

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollTop) {
                setShowScrollButton(false); // hacia abajo => esconder
            } else {
                setShowScrollButton(true); // hacia arriba => mostrar
            }
            setLastScrollTop(currentScroll);

            clearTimeout(timeout);
            timeout = setTimeout(() => setShowScrollButton(true), 200); // si se detiene el scroll, mostrar
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <header className="fixed w-full bg-white shadow-sm z-50">
                <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link to="/" className="text-[16px] md:text-xl font-bold code-font">
                                <span className="text-accent">&lt;</span>BraianPalacios
                                <span className="text-accent">/&gt;</span>
                            </Link>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="nav-link flex items-center gap-2"
                                >
                                    <i className={link.icon} />
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile button to toggle menu */}
                        <div className="fixed bottom-4 right-4 z-50 md:hidden">
                            <button
                                onClick={showMenu}
                                className={`${!hiddeMenu ? "bg-red-600" : "bg-accent"} text-white p-4 rounded-full shadow-lg focus:outline-none`}
                            >
                                <i className={`fas ${hiddeMenu ? "fa-bars" : "fa-times"} text-xl`}></i>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <div
                    className={`fixed top-0 left-0 z-40 w-full h-min transition-transform ${hiddeMenu ? "-translate-y-full" : "translate-y-16"
                        } duration-500 ease-in-out bg-white shadow-lg`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={showMenu}
                                className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent flex items-center gap-2"
                            >
                                <i className={link.icon} />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>

            {/* Scroll-to-top button */}
            <div className={`fixed bottom-20 right-4 z-40 transition-opacity duration-300 ${showScrollButton ? "opacity-100" : "opacity-0"}`}>
                <button
                    onClick={scrollToTop}
                    className="bg-accent text-white p-3 rounded-full shadow-lg focus:outline-none"
                    aria-label="Scroll to top"
                >
                    <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </>
    );
}
