import { Link } from "react-router";
import { TProfile } from "../types/types";

export default function HeroCardInfo({ file_name, title, subtitle, text_info }: Omit<TProfile, 'id_profile'>) {
    const hiText = title.substring(0, 9); //tomo del 0 al caracter 8
    const nameText = title.substring(10); // tomo del  caracter 10 al final
    const [firstWord, secondWord] = subtitle.split('|');

    return (
        <>
            <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="pt-8 text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    {hiText} <span className="gradient-text">{nameText}</span>
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 mb-6">
                    {firstWord.trim()} <span className="text-accent">|</span> {secondWord.trim()}
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">{text_info}</p>
                <div className="flex gap-x-3 text-[0.8rem] md:text-[1rem]">
                    <Link to="/contacto"
                        className="bg-accent hover:bg-accentDark text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium transition duration-300">
                        Contáctame
                    </Link>
                    <Link to="/proyectos"
                        className="border border-accent text-accent hover:bg-accent px-2 py-1 md:px-6 md:py-3 hover:text-white rounded-md font-medium transition duration-300">
                        Ver proyectos
                    </Link>
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




