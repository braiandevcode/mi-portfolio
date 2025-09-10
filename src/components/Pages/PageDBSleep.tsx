import { TResponseApi } from "../../types/types";
import Image from "../Image";
// COMPONENTE MENSAJE DE DB DORMIDA
export default function PageDbSleep({
  setError,
  setCargandoApp,
  retry,
}: {
  setError: (data: TResponseApi | null) => void;
  setCargandoApp: (load: boolean) => void;
  retry: () => void;
}) {
  // FUNCION PARA VOLVER A INTENTAR RECARGAR WEB
  const handleRetry = () => {
    setCargandoApp(true);
    setError(null);
    retry(); // DISPARA DE NUEVO LA CARGA
  };
  return (
    <>
      <div className="relative flex items-center md:text-3xl text-sm">
        <Image
          src="/images/db-sleep.png"
          alt="La página estaba dormida, recarga para continuar"
          className="flex items-center w-screen h-screen object-contain"
        />
        <button
          type="button"
          onClick={handleRetry}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/80 text-blue-600 hover:text-blue-800 px-6 py-2 rounded-full shadow-lg backdrop-blur z-10 flex items-center gap-2"
        >
          <i className="fas fa-rotate-right"></i>
          <span className="flex items-center gap-1">
            Reintentar <i className="fas fa-repeat"></i>
          </span>
        </button>
      </div>
    </>
  );
}
