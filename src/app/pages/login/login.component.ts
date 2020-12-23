import { roles } from './../../../models/roles';
import { Router } from '@angular/router';
import { user } from './../../../models/user';
import { ApisService } from './../../../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilService } from 'src/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {

    checkoutForm: FormGroup;
    estado: string = "determinate";

    constructor(private formBuilder: FormBuilder, private messageService: MessageService,
        private api: ApisService, private router: Router, private utilService: UtilService) {
        this.checkoutForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    ngOnInit() { }

    onSubmit() {        
        this.estado = "indeterminate";
        this.api.login(this.checkoutForm.get("username").value, '3dr' + btoa(this.checkoutForm.get("password").value)).then(data => {
            
            if (data.headerApp.code === 200) {
                var roles_: roles[] = [];
                data.data.roles.forEach(element => {
                    let rol = {
                        id: element.id,
                        rol: element.rol,
                        shorcut: element.shorcut
                    }
                    roles_.push(rol);
                });
                let empresa = {
                    dni: data.data.usuario.empresa.dni,
                    entiid: data.data.usuario.empresa.entiid,
                    nombcome: data.data.usuario.empresa.nombcome,
                    razosoci: data.data.usuario.empresa.razosoci,
                }
                let user: user = {
                    usuaid: data.data.usuario.usuaid,
                    dni: data.data.usuario.dni,
                    email: data.data.usuario.email,
                    state: data.data.usuario.estado,
                    name: data.data.usuario.nombres,
                    lastname: data.data.usuario.apellidos,
                    roles: roles_,
                    photo: environment.url + data.data.usuario.photo,
                    empresa: empresa,
                    clave: data.data.usuario.clave,
                    nickname: data.data.usuario.nickname
                }

                if (data.data.roles.length <= 0) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Rosa Mística',
                        detail: "EL usuario no tiene configurado un rol para el sistema"
                    });
                    this.estado = "determinate";
                    return;

                } else {
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", data.data.usuario.token);
                    this.estado = "determinate";
                    this.router.navigate(['/dashboard']);
                }

            } else {
                this.estado = "determinate";
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rosa Mística',
                    detail: data.headerApp.message
                });
            }
        }).catch(err => {
            this.estado = "determinate";
            this.messageService.add({
                severity: 'error',
                summary: 'Rosa Mística',
                detail: 'Error en la aplicación intentelo más tarde'
            });
        })

    }



}
