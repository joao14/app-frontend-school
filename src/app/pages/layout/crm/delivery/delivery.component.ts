import { Component, OnInit } from '@angular/core';
import { delivery } from 'src/models/delivery';
import { ApisService } from 'src/services/apis.service';
import { MessageService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
  providers: [TranslateService, MessageService],  
})
export class DeliveryComponent implements OnInit {

  deliveries: Array<delivery> = [];

  constructor(private api: ApisService, private router: Router) { }

  ngOnInit(): void {
    this.api.getdeliveries(localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        this.deliveries = data.data.cargocompanies;
      }
    }).catch(err => {
      console.log(err);
    })
  }

  addDelivery() {
    console.log('Agregar la finca');
    this.router.navigate(['/editDelivery']);
  }

  edit(delivery: delivery){
    console.log('Editando delivery...');
    console.log(delivery);
    this.router.navigate(['/editDelivery'], { state: { delivery: JSON.stringify(delivery) } });
    
  }

}
