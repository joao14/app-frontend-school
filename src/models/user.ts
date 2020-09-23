import { roles } from './roles';

export interface user {
    dni: string;
    email: string;
    state: string;
    name: string;
    lastname: string;
    roles: roles[];
}
