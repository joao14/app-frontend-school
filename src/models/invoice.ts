import { detail } from './detail';
import { head } from './head';

export interface invoice{
    cabecera: head;
    detalles: detail[];
    idObjTmp: string;
}