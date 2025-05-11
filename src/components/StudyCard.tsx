import { TStudy } from "../types/types";

export default function StudyCard({ title, institution, period, text_info }: Omit<TStudy, 'id_study'>) {
    return (
        <div className="relative timeline-item">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start gap-1.5 lg:flex-row md:gap-0 lg:justify-between lg:items-start mb-2">
                    <h4 className="font-bold text-lg">
                        {title}
                        {institution && (
                            <>
                                {' - '}
                                <span className="text-accent underline">{institution}</span>
                            </>
                        )}
                    </h4>
                    <span className="bg-accent text-white text-[0.7rem] md:text-[0.9rem] px-2 py-1 rounded">
                        {period}
                    </span>
                </div>
                <p className="text-gray-600">{text_info}</p>
            </div>
        </div>
    );
}
