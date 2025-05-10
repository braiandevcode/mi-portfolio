import {  AppData } from "../types/types";
import StudyCard from "./CardStudies";

export default function About({ trajectory, studies }: Pick<AppData, 'trajectory' | 'studies'>) {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Sobre mí</h2>
          <div>
            <p className="mb-6">{trajectory?.info_trajectory}</p>
            <h3 className="text-xl font-semibold mb-2">Estudios</h3>
            <ul className="list-disc pl-6">
              {studies?.map((study) => (
                <li key={study.id_study}>
                 <StudyCard 
                    period={study.period} 
                    institution={study.institution} 
                    title={study.title} 
                    text_info={study.text_info}
                  />
                </li> 
              ))}
            </ul>
          </div>
      </div>
    </section>
  );
}
