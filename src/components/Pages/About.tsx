import { AppData } from "../../types/types";
import StudyCard from "../StudyCard";
import TrajectoryCard from "../TrajectoryCard";

export default function About({ trajectory, studies }: Pick<AppData, 'trajectory' | 'studies'>) {
  return (
    <>
      <section className=" py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-12">
            <span className="text-2xl md:text-3xl md:border-b-4 border-b-0 border-accent pb-2">Sobre mí</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              {
                trajectory && <>
                  <TrajectoryCard info_trajectory={trajectory?.info_trajectory} />
                </>
              }
            </div>
            <div className="md:w-1/2">
              <h3 className="text-[18px] md:text-2xl font-semibold mb-2">Estudios</h3>
              <div className="flex flex-col gap-3 list-disc pl-6">
                {studies?.map((study) => (
                  <StudyCard
                    key={study.id_study}
                    period={study.period}
                    institution={study.institution}
                    title={study.title}
                    text_info={study.text_info}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

