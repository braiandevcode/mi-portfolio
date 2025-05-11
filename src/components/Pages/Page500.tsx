import Image from "../Image";

export default function Page500() {
    return (
        <>
            <div className="flex items-center">
                <Image
                    src="/images/error-500.png"
                    alt="Error 500 - Servicio temporalmente no disponible"
                    className="flex items-center w-screen h-screen object-contain"
                />
            </div>
        </>
    )
}