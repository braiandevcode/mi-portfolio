export default function Modal({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                    <h2 className={`text-xl font-bold ${type === "success" ? "text-green-500" : "text-red-500"}`}>
                        {type === "success" ? "Éxito" : "Error"}
                    </h2>
                    <p className="mt-4">{message}</p>
                    <button
                        className="mt-6 bg-accent text-white py-2 px-4 rounded-md"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    );
};
