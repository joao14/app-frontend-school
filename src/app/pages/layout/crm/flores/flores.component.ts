import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';

export interface Flower {
  id: number;
  name: string;
  state: string;
  images: Array<string>
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
    this.sortField="";
    this.sortOrder="";
    this.inicializate();
  }

  inicializate() {
    this.options = [{ label: 'Todos', value: null }, { label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
    this.dialogVisible=false;
    console.log(localStorage.getItem("token"));
    this.loading=true;
    this.apis.getflowers(localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        data.data.flowers.forEach(element => {
          let images = ['https://c.pxhere.com/photos/55/4e/red_flower_red_flower_rose_macro_bloom-1370874.jpg!d',
            'https://i.pinimg.com/originals/b6/93/86/b69386593df381cfc0b10831a22f0102.jpg',
            'https://i.pinimg.com/originals/03/3e/70/033e706ea5af0ec6c32f938bf5794e47.jpg',
            'https://www.jardineriaon.com/wp-content/uploads/2015/07/flor.jpg',
            'https://image.freepik.com/foto-gratis/flor-blanca-planta-flor-tropical_33755-6252.jpg',
            'https://i.pinimg.com/736x/cc/ef/61/ccef61c496ad39f3a85373e9988cf256.jpg']
          let flower = {
            id: element.florId,
            name: element.nombre,
            state: element.estado=='A'? 'Activo': 'Inactivo',
            images: images
          }
          this.flowers.push(flower);
        });
        this.loading=false;
      }
    }).catch(err => {  
      console.log(err);
      this.loading=false;
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

  edit(flower: Flower){
    console.log('Editando...');
    this.router.navigate(['/editFlower'], { state: { flower: JSON.stringify(flower) } });
    
  }

  viewFlor(flower: Flower){
    console.log('Esta es la flor');
    console.log(flower);
    this.selectFlor=flower;
    this.dialogVisible=true;
  }

}
