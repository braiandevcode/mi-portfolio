import { useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Proyect from "./components/Proyect";
import Skill from "./components/Skill";

export default function App() {
    const [cargandoApp, setCargandoApp] = useState(true);

    return (
        <>
            {cargandoApp && (
                <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
                    <img src="/dist/images/loader.svg" alt="Cargando..." className="w-20 h-20 animate-spin" />
                </div>
            )}
            <Header />
            <Hero />
            <Skill setCargandoApp={setCargandoApp} />
            <About />
            <Proyect />
            <Contact />
            <Footer />
        </>
    );
}
