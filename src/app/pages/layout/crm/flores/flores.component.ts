import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';

export interface Flower {
  id: number;
  name: string;
  state: string;
  images: any[]
}

@Component({
  selector: 'app-flores',
  templateUrl: './flores.component.html',
  styleUrls: ['./flores.component.css'],
  providers: [TranslateService, MessageService],
})
export class FloresComponent implements OnInit {

  flowers: Flower[] = [];
  selecteFlowers: Flower[] = [];
  options: SelectItem[];
  selectoptions: any;
  selectFlor: Flower;
  dialogVisible: boolean;
  sortField: string;
  sortOrder: string;
  loading: boolean;

  constructor(private apis: ApisService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('INICIALIZATE');
    this.sortField = "";
    this.sortOrder = "";
    this.inicializate();
  }

  inicializate() {
    this.options = [{ label: 'Todos', value: null }, { label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
    this.dialogVisible = false;
    console.log(localStorage.getItem("token"));
    this.loading = true;
    console.log('FLORES');
    this.apis.getflowers(localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        data.data.flowers.forEach(element => {
          let images_: any[] = [];
          element.recursos.forEach(recurso => {
            let images = {
              atributo: recurso.atributo,
              descripcion: recurso.descripcion
            }
            images_.push(images);
          });

          let flower = {
            id: element.flor.florId,
            name: element.flor.nombre,
            state: element.flor.estado == 'A' ? 'Activo' : 'Inactivo',
            images: images_
          }
          this.flowers.push(flower);
        });
        this.loading = false;
      }
    }).catch(err => {
      console.log(err);
      this.loading = false;
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  }

  onRepresentativeChange(event) {
    console.log('Se selecciono otro evento');
    console.log(event);
  }

  addFlor() {
    console.log('Editando el cliente');
    this.router.navigate(['/editFlower']);
  }

  edit(flower: Flower) {
    console.log('Editando...');
    this.router.navigate(['/editFlower'], { state: { flower: JSON.stringify(flower) } });

  }

  viewFlor(flower: Flower) {
    console.log('Esta es la flor');
    console.log(flower);
    this.selectFlor = flower;
    this.dialogVisible = true;
  }

}
