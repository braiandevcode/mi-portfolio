import config from '../config/configAPI';
import { ApiError, ApiResponse } from '../types/types';

export const apiCall = async <T = unknown>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${config.URL}${config.ENDPOINT}${endpoint}`, options);

    let data: ApiResponse<T>;

    try {
      data = await response.json();
    } catch {
      throw {
        status: response.status || 500,
        message: 'Respuesta inválida del servidor',
      } satisfies ApiError;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || response.statusText || 'Error HTTP en la respuesta',
      } satisfies ApiError;
    }

    if (!data.success) {
      throw {
        status: response.status,
        message: data.message || 'Error en la lógica del backend',
      } satisfies ApiError;
    }

    return data.result;
  } catch (error) {
   
    // Manejo explícito del tipo
    if (error instanceof TypeError) {
      throw {
        status: 503,
        message: 'No se pudo conectar con el servidor. ¿Está apagado o sin conexión?',
      } satisfies ApiError;
    }

    // Validación defensiva de estructura
    if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
      return Promise.reject(error as ApiError);
    }

    throw {
      status: 500,
      message: 'Error inesperado en la llamada a la API',
    } satisfies ApiError;
  }
};

