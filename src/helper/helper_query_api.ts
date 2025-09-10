import config from '../config/configAPI';
import { ApiError, ApiResponse } from '../types/types';

// FUNCION HELPER  PARA TODAS LAS CONSULTAS
export const apiCall = async <T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  try {
    // RUTA + ENDPOINT + OPCIONALMENTE CABECERA
    const response = await fetch(`${config.URL}${config.ENDPOINT}${endpoint}`, options); //==> CONSULTAS

    let data: ApiResponse<T>; // VARIABLE DE TIPO ApiResponse CON GENERICO

    try {
      data = await response.json(); // ==> CONVERTIR A JSON
    } catch {
      // SI RESPONSE.STATUS NO EXISTE (RESPUESTA VACÍA O INVÁLIDA), LO TRATAMOS COMO 503
      throw {
        status: response?.status || 503, // ==> USAMOS ? PORQUE RESPONSE PUEDE SER UNDEFINED
        message: 'Respuesta inválida del servidor', //==> MENSAJE DEL ERROR
      } satisfies ApiError;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || response.statusText || 'Error HTTP en la respuesta',
      } satisfies ApiError;
    }

    // SI NO FUE SATISFACTORIO
    if (!data.success) {
      throw {
        status: response.status,
        message: data.message || 'Error en la lógica del backend',
      } satisfies ApiError;
    }

    return data.result; // ==> SINO RETORNAR EL RESULTADO
  } catch (error) {
    // MANEJO EXPLICITO DEL TIPO DE ERROR DE CONEXION
    if (error instanceof TypeError) {
      // ==> FALLA DE FETCH, SERVIDOR NO DISPONIBLE, CORS BLOQUEADO O DB DORMIDA
      throw {
        status: 503,
        message: 'No se pudo conectar con el servidor. ¿Está apagado o sin conexión?',
      } satisfies ApiError;
    }

    // VALIDACION ADICIONAL PARA CUALQUIER ERROR QUE TENGA STATUS Y MESSAGE
    if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
      // ==> ESTE BLOQUE ASEGURA QUE LOS OBJETOS LANZADOS CON STATUS/MESSAGE SE RECHAZEN CORRECTAMENTE
      return Promise.reject(error as ApiError);
    }

    // NUEVO BLOQUE PARA CAPTURAR OTROS ERRORES DE CONEXION QUE NO SON TypeError
    if (error instanceof Error) {
      // ==> SI ES UN ERROR DE JS NORMAL, LO TRATAMOS COMO SERVICIO NO DISPONIBLE
      return Promise.reject({
        status: 503,
        message: error.message || 'No se pudo conectar con el servidor',
      } satisfies ApiError);
    }

    // CUALQUIER OTRO ERROR INESPERADO
    throw {
      status: 500,
      message: 'Error inesperado en la llamada a la API',
    } satisfies ApiError;
  }
};