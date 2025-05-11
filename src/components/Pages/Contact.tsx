import { useState } from "react";
import { contactSchema } from "../../helper/validator"; // Asegúrate de que la ruta sea correcta
import { z } from "zod";
import { apiCall } from "../../helper/helper_query_api";
import config from "../../config/configAPI";
import Modal from "../Modal";
import { FormData, FormErrors } from "../../types/types";
import { validateFields } from "../../helper/validateFields";

export default function Contact() {
    // INICIAMOS TODOS LOS ESTADOS NECESARIOS
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [form, setForm] = useState<FormData>({
        nameContact: "",
        emailContact: "",
        subjectContact: "",
        message: "",
    });


    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validación en tiempo real con Zod para cada campo
        let fieldError: string | undefined;

        // FUNCION PARA VALIDAR CAMPOS DE CONTACTO
        validateFields({ field: name as keyof FormData, value, setErrors });

        // Si hay un error, lo agregamos al estado
        if (fieldError) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: fieldError,
            }));
        }
    };

    const hasErrors = Object.keys(errors).length > 0;
    const isFormIncomplete = Object.values(form).some((value) => value.trim() === "");
    const disableSubmit = isSubmitting || hasErrors || isFormIncomplete;
    const classInput: string = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent";
    const classEventChange = (name: string) => `${classInput} ${errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-accent"}`;

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({}); // Reseteamos los errores previos

        try {
            // Validación completa con Zod
            contactSchema.parse(form);

            // Si pasa la validación, hacemos el fetch con la función apiCall
            await apiCall(config.CONTACT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            });

            // Si el envío es exitoso
            setIsSubmitting(false);
            setForm({
                nameContact: "",
                emailContact: "",
                subjectContact: "",
                message: "",
            }); // Limpiar el formulario

            // Mostrar modal de éxito
            setModalMessage("¡Mensaje enviado con éxito!");
            setModalType("success");
            setModalVisible(true);

        } catch (err: any) {
            setIsSubmitting(false);
            if (err instanceof z.ZodError) {
                const newErrors: FormErrors = {};
                err.errors.forEach(({ path, message }) => {
                    const field = Array.isArray(path) ? path[0] : String(path);
                    newErrors[field] = message;
                });
                setErrors(newErrors);
            } else {
                // En caso de error en el envío
                setModalMessage("Hubo un error al enviar el mensaje. Intenta nuevamente.");
                setModalType("error");
                setModalVisible(true);
            }
        }
    };

    return (
        <> 
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                        <span className="border-b-4 border-accent pb-2">Contacto</span>
                    </h2>
                    <div className="flex flex-col items-center gap-6">
                        <div className="md:w-8/12">
                            <h3 className="text-[18px] text-2xl font-semibold mb-6">¡Hablemos!</h3>
                            <p className="text-gray-600 mb-8">
                                Si estás interesado en trabajar conmigo, no dudes en contactarme. Estoy siempre abierto a nuevas
                                oportunidades y colaboraciones.
                            </p>
                        </div>
                        <div className="md:w-8/12 w-full">
                            <form className="bg-gray-50 p-4 md:p-8 rounded-xl shadow-sm" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Nombre <span className="text-red-600">*</span></label>
                                    <input
                                        type="text"
                                        name="nameContact"
                                        className={classEventChange("nameContact")}
                                        placeholder="Tu nombre"
                                        value={form.nameContact}
                                        onChange={handleChange}
                                    />
                                    {errors.nameContact && <p className="text-red-500 text-sm">{errors.nameContact}</p>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-600">*</span></label>
                                    <input
                                        type="email"
                                        name="emailContact"
                                        className={classEventChange("emailContact")}
                                        placeholder="tu@email.com"
                                        value={form.emailContact}
                                        onChange={handleChange}
                                    />
                                    {errors.emailContact && <p className="text-red-500 text-sm">{errors.emailContact}</p>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Asunto <span className="text-red-600">*</span></label>
                                    <input
                                        type="text"
                                        name="subjectContact"
                                        className={classEventChange("subjectContact")}
                                        placeholder="Asunto Entrevista"
                                        value={form.subjectContact}
                                        onChange={handleChange}
                                    />
                                    {errors.subjectContact && <p className="text-red-500 text-sm">{errors.subjectContact}</p>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Mensaje <span className="text-red-600">*</span></label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        className={classEventChange("message")}
                                        placeholder="Tu mensaje..."
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className={`${disableSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-accentDark cursor-pointer"} w-full bg-accent text-white py-3 px-4 rounded-md font-medium transition duration-300`}
                                    disabled={disableSubmit}
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Modal de éxito o error */}
                {modalVisible && (
                    <Modal
                        message={modalMessage}
                        type={modalType}
                        onClose={() => setModalVisible(false)}
                    />
                )}
            </section>
        </>
    );

}
