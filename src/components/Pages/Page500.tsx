import Image from "../Image";

export default function Page500() {
    return (
        <>
            <div className="flex flex-col items-center gap-1.5 md:text-3xl text-sm p-1">
                <Image
                    src="/images/error-500.png"
                    alt="Error 503 - Servicio temporalmente no disponible"
                    className="w-full h-auto object-contain"
                />
            </div>
        </>
    )
}