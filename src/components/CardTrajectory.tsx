import { TTrajectory } from "../types/types";

export default function TrajectoryCard({ info_trajectory }: Omit <TTrajectory, 'id_trajectory'>) {
    return (
        <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Mi trayectoria</h3>
            {info_trajectory.split('/').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-6">
                    {paragraph.trim()}
                </p>
            ))}
        </div>
    );
}
