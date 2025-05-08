import config from '../config/configAPI';
const apiCall = async <T = any>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const result = await fetch(`${config.URL}${config.ENDPOINT}${endpoint}`, options);
    const data = await result.json();

    if (!result.ok) {
      throw {
        status: result.status,
        message: data.message || result.statusText,
      };
    }

    if (!data.success) {
      throw {
        status: result.status,
        message: data.message,
      };
    }

    return data.result; // ⬅️ importante: devolvemos solo el campo "result"
  } catch (error) {
    throw error;
  }
};

export default apiCall;
