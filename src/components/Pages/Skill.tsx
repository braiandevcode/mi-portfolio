import { AppData } from '../../types/types';
import GroupFocusContentCard from '../GroupContentFocusCard';
import GroupSkillCards from '../GroupSkillCards';

export default function Skill({ skills, currentFocus }: Pick<AppData, 'skills' | 'currentFocus'>) {
    return (
        <>      
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-bold text-center mb-12">
                        <span className="text-2xl md:text-3xl md:border-b-4 border-b-0 border-accent pb-2">Stack Tecnológico</span>
                    </h2>
                    <div className="lg:hidden sm:block text-center mb-6 text-gray-500 text-sm animate-pulse">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Desliza para ver más
                        <i className="fas fa-arrow-right ml-2"></i>
                    </div>
                    <div className="overflow-x-auto lg:overflow-visible">
                        <GroupSkillCards skills={skills} />
                    </div>
                    <GroupFocusContentCard currentFocus={currentFocus} />
                </div>
            </section>
        </>
    );
}
