import { Item } from './item'

export interface Pedido {
    head: {
        estado: string,
        fecha: string,
        fechactu: string,
        fecharri: string,
        fechdesp: string,
        fechrequ: string,
        pediId: number,
        fase: string,
        usuaId: number,
        client: {
            clieId: number,
            nombres: string
        },
        marcId: {
            marcId: number,
            nombre: string
        },
        cargcompId: {
            cargcompId: number,
            nombre: string
        },
        mawb: string
    },
    items: Array<Item>,
    prealerts: Array<{
        fechcrea: string,
        pdf: string
    }>
}