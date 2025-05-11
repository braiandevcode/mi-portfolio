import Image from "../Image";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center gap-1.5 md:text-3xl text-sm p-1">
                <Image
                    src="/images/error-404.png"
                    alt="Página no encontrada"
                    className="flex items-center w-screen h-screen object-contain"
                />
            </div>
        </>
    )
}