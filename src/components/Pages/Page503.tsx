import { TResponseApi } from "../../types/types";
import Image from "../Image";
export default function Page503(
    {
        setError,
        setCargandoApp,
        retry,
    }: {
        setError: (data: TResponseApi | null) => void;
        setCargandoApp: (load: boolean) => void;
        retry: () => void;
    }) {

    // Función para volver a intentar la carga de datos
    const handleRetry = () => {
        setCargandoApp(true);
        setError(null);
        retry(); // ← dispara de nuevo la carga
    };

    return (
        <>
            <div className="relative flex items-center gap-1.5 md:text-3xl text-sm p-1">
                <Image
                    src="/images/warn-503.png"
                    alt="Error 503 - Servicio temporalmente no disponible"
                    className="flex items-center w-screen h-screen object-contain"
                />
                <button
                    type="button"
                    onClick={handleRetry}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/80 text-blue-600 hover:text-blue-800 px-6 py-2 rounded-full shadow-lg backdrop-blur z-10 flex items-center gap-2"
                >
                    <i className="fas fa-rotate-right"></i>
                    <span className="flex items-center gap-1">Reintentar <i className="fas fa-repeat"></i></span>
                </button>
            </div>
        </>
    )
}