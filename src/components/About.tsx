import { useEffect, useState } from "react";
import { TTrajectory, TStudy, TResponseApi } from "../types/types";
import apiCall from "../helper/helper_query_api";
import config from "../config/configAPI";

interface AboutProps {
  onLoaded?: () => void; 
}

export default function About({ onLoaded }: AboutProps) {
  const [trajectory, setTrajectory] = useState<TTrajectory>();
  const [studies, setStudies] = useState<TStudy[]>();
  const [error, setError] = useState<TResponseApi>();

  useEffect(() => {
    const fetchTrajectory = async () => {
      try {
        const data = await apiCall<TTrajectory[]>(config.TRAJECTORY);
        setTrajectory(data[0]);
      } catch (err) {
        setError(err as TResponseApi);
      }
    };

    const fetchStudies = async () => {
      try {
        const data = await apiCall<TStudy[]>(config.STUDIES);
        setStudies(data);
      } catch (err) {
        setError(err as TResponseApi);
      }
    };

    Promise.all([fetchTrajectory(), fetchStudies()]).finally(() => {
      onLoaded?.(); //Notificar a App que About terminó
    });
  }, []);

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Sobre mí</h2>
        {error ? (
          <p className="text-center text-red-500">Error: {error?.message}</p>
        ) : (
          <div>
            <p className="mb-6">{trajectory?.info_trajectory}</p>
            <h3 className="text-xl font-semibold mb-2">Estudios</h3>
            <ul className="list-disc pl-6">
              {studies?.map((study) => (
                <li key={study.id_study}>{study.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
