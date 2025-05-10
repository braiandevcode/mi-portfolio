import { useEffect } from "react";
import { TProfile } from "../types/types";

export default function HeroCardInfo({ file_name, title, subtitle, text_info }: Omit<TProfile, 'id_profile'>) {
    const hiText = title.substring(0, 9); //tomo del 0 al caracter 8
    const nameText = title.substring(10); // tomo del  caracter 10 al final
    const [firstWord, secondWord] = subtitle.split('|');

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
            <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    {hiText} <span className="gradient-text">{nameText}</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">
                    {firstWord.trim()} <span className="text-accent">|</span> {secondWord.trim()}
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">{text_info}</p>
                <div className="flex space-x-4">
                    <a href="#contact"
                        className="bg-accent hover:bg-accentDark text-white px-6 py-3 rounded-md font-medium transition duration-300">
                        Contáctame
                    </a>
                    <a href="#projects"
                        className="border border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-md font-medium transition duration-300">
                        Ver proyectos
                    </a>
                </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-accent rounded-full opacity-10 absolute -z-10 top-4 left-4">
                    </div>
                    <img
                        src={file_name}
                        alt={nameText}
                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                </div>
            </div>
        </>
    );
};




