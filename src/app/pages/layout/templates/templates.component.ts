import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

export interface Cabecera {
  tempId: string,
  fechcrea: string,
  nombre: string,
  estado: string,
  usuario: string,
  fechactu: string
}

export interface Detalle {
  deteId: string,
  tipoempaque: string,
  cantidadcajas: string,
  tallosxbch: string,
  medidatallo: string,
  cantidadbch: string,
  cantidad: string,
  preciounitario: string,
  total: string,
  farm: string,
  farmId: string,
  florId: string,
  flor: string,
  line: string
}

export interface Template {
  cabecera: Cabecera;
  datelle: Detalle
}

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class TemplatesComponent implements OnInit {

  templates: Array<Template> = [];

  constructor(private api: ApisService, private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router, private formBuilder: FormBuilder, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getTemplates();
  }

  async getTemplates() {
    this.utilService.isLoading.next(true);
    await this.api.getTemplates(localStorage.getItem('token')).then((data) => {
      console.log(data);
      if (data.headerApp.code == 200) {
        this.templates = data.data.templates;
        console.log('Final');
        console.log(this.templates);
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);
  }

  addTemplate() {
    this.router.navigate(['/edittemplate']);
  }

  edit(template: Template) {
    console.log('EDIT');
    console.log(template);
    this.router.navigate(['/edittemplate'], { state: { template: JSON.stringify(template) } });

  }

  async remove(template: Template) {
    await this.api.deleteTemplate(template.cabecera.tempId, localStorage.getItem('token')).then(async (data) => {
      console.log(data);
      if (data.headerApp.code == 200) {
        await this.getTemplates();
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se ha eliminado correctamente' });
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

}
