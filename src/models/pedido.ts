import {Item} from './item'

export interface Pedido{
    head:{        
        estado: string,
        fecha: string,
        pediId: number,
        fase: string,
        usuaId: number,
        client:{
            clieId: number,
            nombres: string
        }
    },
    items: Array<Item>
}