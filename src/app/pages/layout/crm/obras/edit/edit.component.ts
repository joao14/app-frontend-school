import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService, SelectItem } from 'primeng';
import { FileHandle } from 'src/models/FileHandle';
import { obra } from 'src/models/obra';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  edit: boolean;
  obra: obra;
  obraTemp: obra;
  options: SelectItem[];
  uploadedFiles: FileHandle[];
  files: File[] = [];

  constructor(private api: ApisService, private router: Router, private utilService: UtilService, private messageService: MessageService) { 
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.obraTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.obra);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  inicializateValores(){
    this.obra={
      obraId: this.obraTemp != null ? this.obraTemp['obraId'] : null,
      obraNombre: this.obraTemp != null ? this.obraTemp['obraNombre'] : "",
      obraDescripcion: this.obraTemp != null ? this.obraTemp['obraDescripcion'] : "", 
      obraDireccion: this.obraTemp != null ? this.obraTemp['obraDireccion'] : "", 
      obraLogo1: this.obraTemp != null ? this.obraTemp['obraLogo1'] : "", 
      obraLogo2: this.obraTemp != null ? this.obraTemp['obraLogo2'] : "", 
    }
  }
 
  save() {  
    this.api.addobra(this.obra, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['obras']);
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
    this.router.navigate(['obras']);
  }

  modificar(){  
    this.api.updateobra(this.obra, localStorage.getItem("token")).then(data => {     
      if (data.headerApp.code === 200) {
        this.router.navigate(['obras']);
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
    console.log("UPLOAD FILE...");
    
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
          florId: null
        }
       
              
        /*await this.api.addResourcesflowers(resources, localStorage.getItem("token")).then(data => {
                 
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

        })*/

      };
    }
    this.utilService.isLoading.next(false);
    this.messageService.add({ severity: 'success', summary: 'COBO', detail: 'Las images se han subido correctamente' });


  }

  /*onRemove(event) { }

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
  }*/


  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }



}
