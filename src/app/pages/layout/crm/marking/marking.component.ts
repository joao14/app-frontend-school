import { Component, OnInit } from '@angular/core';
import { mark } from 'src/models/mark';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { client } from 'src/models/client';

@Component({
  selector: 'app-marking',
  templateUrl: './marking.component.html',
  styleUrls: ['./marking.component.css'],
  providers: [TranslateService, MessageService],
})
export class MarkingComponent implements OnInit {

  marks: Array<mark> = [];
  clients: Array<client> = [];
  selectClient: client;

  constructor(private apis: ApisService, private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    console.log('Consultando los clientes..');
    this.apis.getclients(localStorage.getItem("token")).then(client => {
      console.log(client);
      if (client.headerApp.code === 200) {
        this.clients = client.data.clientes;
        console.log('Clientes..');
        console.log(this.clients);        
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

 onOptionsSelected() {
    console.log('Consultando las marcas de los clientes');
    this.marks=[];
    this.apis.getmarks(this.selectClient.entiId, localStorage.getItem("token")).then(mark => {
      console.log(mark);
      if (mark.headerApp.code == 200) {
        this.marks = mark.data.marks;
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  }

  addMark(){
    console.log('Nueva Marca');
    this.router.navigate(['/editMarca']);
  }

  edit(mark: mark){
    console.log('Editando las marcaciones');
    console.log(mark);
    this.router.navigate(['/editMarca'], { state: { mark: JSON.stringify(mark) } });
  }


}
