import ProyectCard from "../ProyectCard";
import config from '../../config/configAPI';
import { AppData } from "../../types/types";

export default function Proyect({ projects }: Pick<AppData, 'projects'>) {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="md:border-b-4 border-b-0 border-accent pb-2">Proyectos Destacados</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 && (
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
            )}
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://github.com/braiandevcode" target="_blank" referrerPolicy="no-referrer"
              className="text-sm md:text-lg inline-flex items-center px-2 py-1 md:px-6 md:py-3 border border-accent text-accent hover:bg-accent hover:text-white rounded-md font-medium transition duration-300"
            >
              <i className="fab fa-github mr-2"></i> Ver más proyectos en GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
