import { useEffect, useState } from "react";
import { TResponseApi, TSkill } from "../types/types";
import apiCall from "../helper/helper_query_api";
import config from '../config/configAPI';
import SkillCard from "./SkillCard";

type Props = {
    onLoaded: () => void; 
};

export default function GroupSkillCards({ onLoaded }: Props) {
    const [skills, setSkills] = useState<TSkill[]>([]);
    const [error, setError] = useState<TResponseApi>();

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data: TSkill[] = await apiCall<TSkill[]>(config.SKILLS);
                setSkills(data);
            } catch (err) {
                const newError = err as TResponseApi;
                setError(newError);
            } finally {
                onLoaded?.(); // <- AVISA QUE TERMINÓ
            }
        };

        fetchSkills();
    }, [onLoaded]);

    return (
        <div className="flex lg:grid lg:grid-cols-4 gap-6 min-w-[768px] sm:min-w-[640px] lg:min-w-0">
            { error ? (
                <p className="col-span-full text-center text-red-500">Error: {error?.message}</p>
            ) : skills && skills.length > 0 ? (
                skills.map((skill) => (
                    <SkillCard
                        key={skill.id_skill}
                        icon={skill.icon}
                        title={skill.title}
                        text_info={skill.text_info}
                    />
                ))
            ) : (
                <p className="col-span-full text-center text-yellow-400">No hay datos de Skills</p>
            )}
        </div>
    );
}
