export type TSkill = {
    id_skill: number;
    icon: string;
    title: string;
    text_info: string;
};

export type TProfile = {
    id_profile: number;
    file_name: string;
    title: string;
    subtitle: string;
    text_info: string;
};

export type TResponseApi = {
    status: number;
    message: string;
};

export interface IConfigApi {
    URL: string;
    ENDPOINT: string;
    SKILLS: string;
    PROFILE: string;
    CURRENT_FOCUS: string;
    PROJECT: string;
    TRAJECTORY:string;
    STUDIES:string;
    CONTACT:string;
}

export type TCurrentFocus = {
    id_focus: number;
    title: string;
    subtitle: string;
    file_name: string;
    intro_text: string;
    list_item_1: string;
    list_item_2: string;
    list_item_3: string;
    list_item_4: string;
    list_item_5: string;
    closing_text: string;
}

export type TProject = {
    id_project: number;
    file_name: string;
    title: string;
    info_project: string;
    technologies: string;
    github_url: string;
    demo_url: string;
};


export type TTrajectory = {
    id_trajectory: number;
    info_trajectory: string;
};

export type TStudy = {
    id_study: number;
    title: string;
    institution?: string; // puede venir null
    period: string;
    text_info: string;
};

// Tipos de los datos del formulario
export interface FormData {
    nameContact: string;
    emailContact: string;
    subjectContact: string;
    message: string;
}

export  type FormErrors = {
    [key: string]: string; // Acepta claves de tipo string y valores de tipo string
};