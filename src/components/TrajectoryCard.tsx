import { TTrajectory } from "../types/types";

export default function TrajectoryCard({ info_trajectory }: Omit <TTrajectory, 'id_trajectory'>) {
    return (
        <div className="md:w-10/12 p-1.5">
            <h3 className="text-[18px] md:text-2xl font-semibold mb-4">Mi trayectoria</h3>
            {info_trajectory.split('/').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-6 w-full">
                    {paragraph.trim()}
                </p>
            ))}
        </div>
    );
}
