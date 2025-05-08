import ProyectCard from "./ProyectCard";
import config from '../config/configAPI';
import { useEffect, useState } from "react";
import apiCall from "../helper/helper_query_api";
import { TProject, TResponseApi } from "../types/types";

interface ProyectProps {
  onLoaded?: () => void; 
}

export default function Proyect({ onLoaded }: ProyectProps) {
  const [projects, setProject] = useState<TProject[]>();
  const [error, setError] = useState<TResponseApi>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data: TProject[] = await apiCall<TProject[]>(config.PROJECT);
        setProject(data);
      } catch (err) {
        setError(err as TResponseApi);
      } finally {
        onLoaded?.(); 
      }
    };

    fetchProject();
  }, []);

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="border-b-4 border-accent pb-2">Proyectos Destacados</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {error ? (
            <p className="col-span-full text-center text-red-500">Error: {error?.message}</p>
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <ProyectCard
                key={project.id_project}
                file_name={`${config.URL}/uploads/${project.file_name}`}
                title={project.title}
                info_project={project.info_project}
                technologies={project.technologies}
                github_url={project.github_url}
                demo_url={project.demo_url}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-yellow-400">No hay datos de projects</p>
          )}
        </div>
        <div className="mt-12 text-center">
          <a
            href="https://github.com/braiandevcode"
            className="inline-flex items-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white rounded-md font-medium transition duration-300"
          >
            <i className="fab fa-github mr-2"></i> Ver más proyectos en GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
