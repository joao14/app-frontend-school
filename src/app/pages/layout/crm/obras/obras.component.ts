import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { obra } from 'src/models/obra';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css'],
  providers: [TranslateService, MessageService],
})
export class ObrasComponent implements OnInit {

  obras: Array<obra> = []

  constructor(private apis: ApisService, private router: Router, private utilservice: UtilService) {
  }

  ngOnInit(): void {
    this.getObras()
  }
 
  getObras(){
    this.utilservice.isLoading.next(true);
    this.apis.getobras(localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200 || data.headerApp.code == 0) {
         this.obras= data.data.obras 
        this.utilservice.isLoading.next(false);
      }
    }).catch(err => {
      this.utilservice.isLoading.next(false);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  } 

  addObra(){ 
    this.router.navigate(['/editobras']);
  }

  edit(obra: obra) {
    this.router.navigate(['/editobras'], { state: { obra: JSON.stringify(obra) } });
  }
}
