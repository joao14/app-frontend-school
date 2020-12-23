import { roles } from './roles';

export interface user {
    usuaid: number;
    dni: string;
    email: string;
    state: string;
    name: string;
    lastname: string;
    roles: roles[];
    photo: any;
    empresa: {
        dni: string;
        entiid: number;
        nombcome: string;
        razosoci: string;
    },
    clave: string;
    nickname: string;
}
