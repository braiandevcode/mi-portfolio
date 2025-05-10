import { AppData } from "../types/types";
import SkillCard from "./SkillCard";

export default function GroupSkillCards({ skills }: Pick<AppData, "skills">) {
    return (
        <>
            <div className="flex lg:grid lg:grid-cols-4 gap-6 min-w-[768px] sm:min-w-[640px] lg:min-w-0">
                {   skills && skills?.length > 0 &&
                    skills.map((skill) => (
                        <SkillCard
                            key={skill.id_skill}
                            icon={skill.icon}
                            title={skill.title}
                            text_info={skill.text_info}
                        />
                    )
                )}
            </div>
        </>
    );
}
