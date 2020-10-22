import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { FileHandle } from 'src/models/FileHandle';
import { flower } from 'src/models/flower';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  edit: boolean;
  options: SelectItem[];
  flower: flower;
  flowerTemp: flower;
  //files: any[] = [];
  uploadedFiles: FileHandle[];
  files: File[] = [];

  constructor(private api: ApisService, private router: Router, private messageService: MessageService) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.flowerTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.flower);
      console.log(this.flowerTemp);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  save() {
    console.log('[Guardando la flor]');
    console.log(this.flower);
    this.api.addflowers(this.flower, localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code === 200) {
        this.router.navigate(['flores']);
        this.inicializateValores();
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  cancelar() {
    this.router.navigate(['flores']);
  }

  selecttipo(event) {
    console.log('VAMOS TIPO...');
    console.log(event);

  }

  inicializateValores() {
    this.flower = {
      id: this.flowerTemp != null ? this.flowerTemp['id'] : null,
      name: this.flowerTemp != null ? this.flowerTemp['name'] : "",
      state: this.flowerTemp != null ? this.flowerTemp['state'] == "Activo" ? "A" : "I" : "A",
      images: this.flowerTemp != null ? this.flowerTemp['images'] : []
    };
    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
  }

  get():[]{
    
    return [];
  }

  modificar() {
    this.api.updateflower(this.flower, localStorage.getItem("token")).then(data => {
      console.log("Actualizar flor");
      console.log(data);
      if (data.headerApp.code === 200) {
        this.router.navigate(['flores']);
        this.inicializateValores();
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  uploadFile(event) {
    console.log("UPLOAD");
    console.log(event);
    const target: DataTransfer = <DataTransfer>event.target;
    console.log(target);
    console.log("NEXT ANALISIS");
    if (target.files.length !== 1) {
      throw new Error("Cannot use multiple files");
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    console.log("Este es el nombre");
    console.log(target.files[0].name);
  }


  onSelect(event) {
    this.files.push(...event.addedFiles);
    console.log('LISTA FINAL DE IMAGENES');
    console.log(this.files);

  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    console.log('REMOVE');
    console.log(this.files);
  }



}
