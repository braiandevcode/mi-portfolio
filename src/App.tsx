import { useEffect, useState } from "react";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  AppData,
  TCurrentFocus,
  TProfile,
  TProject,
  TResponseApi,
  TSkill,
  TStudy,
  TTrajectory,
} from "./types/types";
import { apiCall } from "./helper/helper_query_api";
import config from "./config/configAPI";
import Image from "./components/Image";

import { Routes, Route, Outlet } from "react-router";
import HomePage from "./components/Pages/Hero";
import Proyect from "./components/Pages/Proyect";
import Skill from "./components/Pages/Skill";
import NotFound from "./components/Pages/NotFound";
import Page503 from "./components/Pages/Page503";
import Page500 from "./components/Pages/Page500";
import PageDbSleep from "./components/Pages/PageDBSleep";

export default function App() {
  const [cargandoApp, setCargandoApp] = useState(true);
  const [error, setError] = useState<TResponseApi | null>(null);
  const [data, setData] = useState<AppData | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setCargandoApp(true);
        const [focus, profile, projects, skills, trajectory, studies] =
          await Promise.all([
            apiCall<TCurrentFocus[]>(config.CURRENT_FOCUS),
            apiCall<TProfile[]>(config.PROFILE),
            apiCall<TProject[]>(config.PROJECT),
            apiCall<TSkill[]>(config.SKILLS),
            apiCall<TTrajectory[]>(config.TRAJECTORY),
            apiCall<TStudy[]>(config.STUDIES),
          ]);
        setData({
          currentFocus: focus[0],
          profile: profile[0],
          projects: projects,
          skills: skills,
          studies: studies,
          trajectory: trajectory[0],
        });
      } catch (err) {
        const e = err as TResponseApi;
        setError({ status: e.status, message: e.message });
      } finally {
        setCargandoApp(false);
      }
    };

    fetchAll();
  }, [retryTrigger]);

  return (
    <>
      {cargandoApp ? (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <Image
            src="/images/loader.svg"
            alt="Cargando..."
            className="w-20 h-20 animate-spin"
          />
        </div>
      ) : error ? (
        error.status === 503 ? (
          <Page503
            setError={setError}
            setCargandoApp={setCargandoApp}
            retry={() => setRetryTrigger((prev) => prev + 1)}
          />
        ) : error.status === 0 ? (
          <PageDbSleep
            setError={setError}
            setCargandoApp={setCargandoApp}
            retry={() => setRetryTrigger((prev) => prev + 1)}
          />
        ) : (
          <Page500 />
        )
      ) : (
        <Routes>
          <Route
            element={
              <div className="flex flex-col min-h-full">
                <Header />
                <main className="flex-grow">
                  <Outlet />
                </main>
                <Footer />
              </div>
            }
          >
            <Route path="/" element={<HomePage profile={data?.profile} />} />
            <Route
              path="/acerca"
              element={
                <About trajectory={data?.trajectory} studies={data?.studies} />
              }
            />
            <Route path="/contacto" element={<Contact />} />
            <Route
              path="/proyectos"
              element={<Proyect projects={data?.projects} />}
            />
            <Route
              path="/habilidades"
              element={
                <Skill
                  currentFocus={data?.currentFocus}
                  skills={data?.skills}
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
