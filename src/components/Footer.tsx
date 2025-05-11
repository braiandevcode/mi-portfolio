import { Link } from "react-router";

// <!-- Footer -->
export default function Footer() {
    return <>
        <footer className="bg-secondary text-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-xl flex flex-col md:items-center mb-4 md:mb-0">
                        <Link to="/" className="font-bold code-font flex items-center justify-center">
                            <span className="text-accent">&lt;</span>BraianPalacios<span className="text-accent">/&gt;</span>
                        </Link>
                        <p className="text-gray-400 mt-2">Braian Palacios | Full Stack Developer</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="https://github.com/braiandevcode" target="_blank" referrerPolicy="no-referrer" className="text-gray-400 hover:text-accent text-xl">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/braianpalacios/" target="_blank" referrerPolicy="no-referrer" className="text-gray-400 hover:text-accent text-xl">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p className="text-[9px] md:text-[12px]">© 2025 Braian Palacios. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    </>
}