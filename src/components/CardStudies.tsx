import { TStudy } from "../types/types";

export default function StudyCard({ title, institution, period, text_info }: Omit<TStudy, 'id_study'>) {
    return (
        <div className="relative timeline-item">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">
                        {title}
                        {institution && (
                            <>
                                {' - '}
                                <span className="text-accent underline">{institution}</span>
                            </>
                        )}
                    </h4>
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded">
                        {period}
                    </span>
                </div>
                <p className="text-gray-600">{text_info}</p>
            </div>
        </div>
    );
}
