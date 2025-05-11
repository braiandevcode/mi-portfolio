import { TProject } from "../types/types";

export default function ProyectCard({
  file_name,
  title,
  info_project,
  technologies,
  github_url,
  demo_url,
}: Omit<TProject, 'id_project'>) {
  
  // Convertimos la lista de tecnologías en un array
  const techList = technologies.split(',').map(tech => tech.trim());

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm project-card transition duration-300">
      {/* Imagen superior */}
      <div className="h-48 bg-accent flex items-center justify-center">
        <img
          src={file_name}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="font-bold text-[16px] md:text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {info_project}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techList.map((tech, idx) => (
            <span key={idx} className="bg-accent/10 text-accent text-[16px] md:text-xs px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Enlaces */}
        <div className="flex space-x-3">
          <a href={github_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accentDark">
            <i className="fab fa-github"></i> Código
          </a>
          <a href={demo_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accentDark">
            <i className="fas fa-external-link-alt"></i> Demo
          </a>
        </div>
      </div>
    </div>
  );
}
