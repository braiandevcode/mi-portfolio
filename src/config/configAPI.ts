import { IConfigApi } from "../types/types";

export default {
    URL: import.meta.env.VITE_URL,
    ENDPOINT: import.meta.env.VITE_ENDPOINT,
    SKILLS:import.meta.env.VITE_SKILL,
    PROFILE:import.meta.env.VITE_PROFILE,
    CURRENT_FOCUS:import.meta.env.VITE_CURRENT,
    PROJECT:import.meta.env.VITE_PROJECT,
    TRAJECTORY:import.meta.env.VITE_TRAJECTORY,
    STUDIES:import.meta.env.VITE_STUDIES,
    CONTACT: import.meta.env.VITE_CONTACT
} as IConfigApi;