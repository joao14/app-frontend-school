import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng';
import { Pedido } from 'src/models/pedido';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class OrderComponent implements OnInit {

  pedidos: Array<Pedido> = []
  select: Pedido
  indice: number

  constructor(private api: ApisService, private util: UtilService, private router: Router,
    private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this.getPedidos()

  }

  async getPedidos() {
    this.util.isLoading.next(true);
    await this.api.pedidos(localStorage.getItem('token')).then(async (data) => {
      console.log('data');
      console.log(data);
      if (data.headerApp.code == 200) {
        this.pedidos = data.data.orders;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.util.isLoading.next(false);
  }

  editPedido(pedido: Pedido, indice: number) {
    console.log('Pedido');
    console.log(pedido);
    this.select = pedido
    this.indice = indice
   
    
  }


  getState(state: string) {
    let type = null;
    switch (state) {
      case 'PR': {
        type = 'Pre alerta'
        break;
      }
      case 'PE': {
        type = 'Pendiente'
        break;
      }
      case 'RE': {
        type = 'Revisión'
        break;
      }
      case 'FA': {
        type = 'Facturado'
        break;
      }
      case 'PRE': {

        break;
      }
      case 'CA': {
        type = 'Cancelado'
        break;
      }
      default: {
        type = 'Pedido'
        break;
      }
    }

    return type

  }

  confirmar() {
    this.confirmationService.confirm({
      message: "Are you sure to confirm order?",
      accept: async () => {
        console.log('ORDER ACCEPTED');

      }
    })
  }

  cancel() {
    console.log('Cancelar');

  }


}
