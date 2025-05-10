import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Proyect from "./components/Proyect";
import Skill from "./components/Skill";
import { AppData, TCurrentFocus, TProfile, TProject, TResponseApi, TSkill, TStudy, TTrajectory } from "./types/types";
import { apiCall } from "./helper/helper_query_api";
import config from "./config/configAPI"
import Image from "./components/Image";


export default function App() {
    const [cargandoApp, setCargandoApp] = useState(true);
    const [error, setError] = useState<TResponseApi | null>(null);

    const [data, setData] = useState<AppData | null>(null);

    // Función para volver a intentar la carga de datos
    const handleRetry = () => {
        setCargandoApp(true);
        setError(null);
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setCargandoApp(true)
                const [focus, profile, projects, skills, trajectory, studies] = await Promise.all([
                    apiCall<TCurrentFocus[]>(config.CURRENT_FOCUS),
                    apiCall<TProfile[]>(config.PROFILE),
                    apiCall<TProject[]>(config.PROJECT),
                    apiCall<TSkill[]>(config.SKILLS),
                    apiCall<TTrajectory[]>(config.TRAJECTORY),
                    apiCall<TStudy[]>(config.STUDIES)
                ]);
                setData({
                    currentFocus: focus[0],
                    profile: profile[0],
                    projects: projects,
                    skills: skills,
                    studies: studies,
                    trajectory: trajectory[0]
                });
            } catch (err) {
                const e = err as TResponseApi;
                setError({ status: e.status, message: e.message });
            } finally {
                setCargandoApp(false);
            }
        };

        fetchAll();
    }, []);

    return (
        <>
            {cargandoApp ? (
                <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
                    <Image src="/images/loader.svg" alt="Cargando..." className="w-20 h-20 animate-spin" />
                </div>
            ) : error ? (
                error.status === 404 ? (
                    <Image
                        src="/images/error-404.png"
                        alt="Página no encontrada"
                        className="w-screen h-screen object-cover"
                    />
                ) : error.status === 500 ? (
                    <Image
                        src="/images/error-500.png"
                        alt="Error del servidor"
                        className="w-screen h-screen object-cover"
                    />
                ) : error.status === 503 ? (
                        <div className="relative">
                            <Image
                                src="/images/warn-200.png"
                                alt="Error temporal inesperado"
                                className="w-screen h-screen object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRetry}
                                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/80 text-blue-600 hover:text-blue-800 px-6 py-2 rounded-full shadow-lg backdrop-blur z-10 flex items-center gap-2"
                            >
                                <i className="fas fa-rotate-right"></i>
                                <span>Reintentar</span>
                            </button>
                        </div>
                    ): (
                            <Image
                                src="/images/error-500.png"
                                alt="Error del servidor"
                                className="w-screen h-screen object-cover"
                            />
                        )
            ) : (
                <>
                    <Header />
                    <Hero profile={data?.profile} />
                    <Skill skills={data?.skills} currentFocus={data?.currentFocus} />
                    <About studies={data?.studies} trajectory={data?.trajectory} />
                    <Proyect projects={data?.projects} />
                    <Contact />
                    <Footer />
                </>
            )}
        </>
    );
}