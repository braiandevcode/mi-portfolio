import { useState, useEffect } from "react";

//  Header/Navbar 
export default function Header() {
    const [hiddeMenu, setHiddeMenu] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

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


    useEffect(() => {
        const links = document.querySelectorAll("a[href^='#']");
        links.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const targetId = link.getAttribute("href")?.replace("#", "");
                if (targetId) {
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                    }
                }
            });
        });
    }, []);

    return (
        <>
            <header className="fixed w-full bg-white shadow-sm z-50">
                <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <a href="#" className="text-xl font-bold code-font">
                                <span className="text-accent">&lt;</span>BraianPalacios
                                <span className="text-accent">/&gt;</span>
                            </a>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#about" className="nav-link flex items-center gap-2">
                                <i className="fas fa-user" /> Sobre mí
                            </a>
                            <a href="#skills" className="nav-link flex items-center gap-2">
                                <i className="fas fa-lightbulb" /> Habilidades
                            </a>
                            <a href="#projects" className="nav-link flex items-center gap-2">
                                <i className="fas fa-folder-open" /> Proyectos
                            </a>
                            <a href="#contact" className="nav-link flex items-center gap-2">
                                <i className="fas fa-envelope" /> Contacto
                            </a>
                        </div>
                        <div className="fixed bottom-4 right-4 z-50 md:hidden">
                            <button onClick={showMenu} className="bg-accent text-white p-4 rounded-full shadow-lg focus:outline-none">
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <div className={`fixed top-0 left-0 z-40 w-full h-min transition-transform ${hiddeMenu ? "-translate-y-full" : "translate-y-16"} duration-500 delay-500 ease-in-out bg-white shadow-lg`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a  href="#about" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent flex items-center gap-2">
                            <i className="fas fa-user" />
                            Sobre mí
                        </a>
                        <a href="#skills" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent flex items-center gap-2">
                            <i className="fas fa-lightbulb" />
                            Habilidades
                        </a>
                        <a href="#projects" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent flex items-center gap-2">
                            <i className="fas fa-folder-open" />
                            Proyectos
                        </a>
                        <a href="#contact" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent flex items-center gap-2">
                            <i className="fas fa-envelope" />
                            Contacto
                        </a>
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
