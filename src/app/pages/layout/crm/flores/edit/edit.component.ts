import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { FileHandle } from 'src/models/FileHandle';
import { flower } from 'src/models/flower';
import * as moment from 'moment';
import { UtilService } from 'src/services/util.service';
import { environment } from 'src/environments/environment';

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

  constructor(private api: ApisService, private router: Router, private messageService: MessageService, private utilService: UtilService) {
    if (this.router.getCurrentNavigation().extras.state != null) {    
      this.flowerTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.flower);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  save() {
    let flower = {
      nombre: this.flower.name,
      estado: this.flower.state
    }
    this.api.addflowers(flower, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['flores']);
        this.inicializateValores();
      }
    }).catch(err => {
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

  get(): [] {

    return [];
  }

  modificar() {
    let flower = {
      florId: this.flower.id,
      nombre: this.flower.name,
      estado: this.flower.state
    }
    this.api.updateflower(flower, localStorage.getItem("token")).then(data => {
     
      if (data.headerApp.code === 200) {
        this.router.navigate(['flores']);
        this.inicializateValores();
      }

    }).catch(err => {
     
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  uploadFile(event) {
    
    const target: DataTransfer = <DataTransfer>event.target;
    
    if (target.files.length !== 1) {
      throw new Error("Cannot use multiple files");
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
   
  }


  onSelect(event) {
    this.files.push(...event.addedFiles);        
    this.utilService.isLoading.next(true);
    for (let index = 0; index < this.files.length; index++) {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[index]);
      reader.onload = async () => {
        let resources = {
          atributo: this.files[index].name + ';' + reader.result.toString(),
          descripcion: "IMG",
          fechregi: this.getFormatDate(new Date()),
          estado: "A",
          florId: this.flower.id
        }
       
              
        await this.api.addResourcesflowers(resources, localStorage.getItem("token")).then(data => {
                 
          if (data.headerApp.code == 200) {
            
            this.flower.images.push({
              atributo:  environment.url + data.data.resource.atributo,
              descripcion: data.data.resource.descripcion,
              reflId: data.data.resource.reflId
            });
            this.files=[];
          }

        }).catch(err => {
          if (err.error.code == 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }

        })

      };
    }
    this.utilService.isLoading.next(false);
    this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Todos los recursos se han subido correctamente' });


  }

  onRemove(event) { }

  async remove(imageold: any) {
    
    this.utilService.isLoading.next(true);

    await this.api.removeResourcesflowers(imageold.reflId, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
        this.flower.images = this.flower.images.filter(image => image != imageold);
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);
  }


  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }


}
