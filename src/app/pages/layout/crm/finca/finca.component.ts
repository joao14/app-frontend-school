import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'src/services/apis.service';
import { finca } from 'src/models/finca';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css'],
  providers: [TranslateService, MessageService],
})
export class FincaComponent implements OnInit {

  fincas: Array<finca>=[];

  constructor(private apis: ApisService, private router: Router) { }

  ngOnInit(): void {
    this.inicializate();
  }

  inicializate() {   
    this.apis.getfinca(localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        data.data.farms.forEach(element => {
          let finca = {
            apellidos: element.apellidos,
            auxcodi: element.auxcodi,
            ciudad: element.ciudad,
            contacto: element.contacto,
            direccion: element.direccion,
            email: element.email,
            entiDni: element.entiDni,
            entiId: element.entiId,
            estado:element.estado=='A'? 'Activo': 'Inactivo',
            fechregi: element.fechregi,
            nombres: element.nombres,
            pais: element.pais,
            phone: element.phone,
            razosoci: element.razosoci,
            tipo: element.tipo,
            tipoenti: element.tipoenti
          }
          this.fincas.push(finca);
        });

        console.log('FINCAS..');
        console.log(this.fincas);
        

      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  }

  addFinca() {
    console.log('Agregar la finca');
    this.router.navigate(['/editFinca']);
  }

  edit(finca: finca){
    console.log('Editando finca...');
    this.router.navigate(['/editFinca'], { state: { finca: JSON.stringify(finca) } });
    
  }

}
