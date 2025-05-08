import { useEffect, useState } from 'react';
import GroupFocusContentCard from './GroupContentFocusCard';
import GroupSkillCards from './GroupSkillCards';

interface SkillProps {
    setCargandoApp: (value: boolean) => void;
}

export default function Skill({ setCargandoApp }: SkillProps) {
    const [isSkillsLoaded, setIsSkillsLoaded] = useState(false);
    const [isFocusLoaded, setIsFocusLoaded] = useState(false);

    useEffect(() => {
        if (isSkillsLoaded && isFocusLoaded) {
            setCargandoApp(false);
        }
    }, [isSkillsLoaded, isFocusLoaded, setCargandoApp]);

    return (
        <section id="skills" className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="md:text-3xl sm:text-sm font-bold text-center mb-12">
                    <span className="border-b-4 border-accent pb-2">Stack Tecnológico</span>
                </h2>
                <div className="lg:hidden sm:block text-center mb-6 text-gray-500 text-sm animate-pulse">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Desliza para ver más
                    <i className="fas fa-arrow-right ml-2"></i>
                </div>
                <div className="overflow-x-auto lg:overflow-visible">
                    <GroupSkillCards onLoaded={() => setIsSkillsLoaded(true)} />
                </div>
                <GroupFocusContentCard onLoaded={() => setIsFocusLoaded(true)} />
            </div>
        </section>
    );
}
