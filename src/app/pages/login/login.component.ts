import { roles } from './../../../models/roles';
import { Router } from '@angular/router';
import { user } from './../../../models/user';
import { ApisService } from './../../../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilService } from 'src/services/util.service';
import { environment } from 'src/environments/environment';
import { obras } from 'src/models/obras';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {

    checkoutForm: FormGroup;
    estado: string = "determinate";
    obras: obras[] = []

    constructor(private formBuilder: FormBuilder, private messageService: MessageService,
        private api: ApisService, private router: Router, private utilService: UtilService) {
        this.checkoutForm = this.formBuilder.group({
            username: '',
            password: '',
            obra: ''
        });
    }

    ngOnInit() {
    }

    onSubmit() {

        this.estado = "indeterminate";
        this.api.login(this.checkoutForm.get("username").value, this.checkoutForm.get("password").value).then(data => {

            if (data.headerApp.code === 200) {

                data.data.obras.forEach(obra => {
                    this.obras.push(obra);
                })

                this.estado = "determinate";

                if (this.checkoutForm.get("obra").value['obra'] != undefined) {
                    let perfil = {
                        code: data.data.perfil.code,
                        name: data.data.perfil.name
                    }
                    let user: user = {
                        usuaId: data.data.usuario.usuaId,
                        usuaApellidos: data.data.usuario.usuaApellidos,
                        usuaNombres: data.data.usuario.usuaNombres,
                        usuaNick: data.data.usuario.usuaNick,
                        obraId: this.checkoutForm.get("obra").value['id'],
                        perfil: perfil
                    }

                    console.log("USER");
                    console.log(user);
                    

                    localStorage.setItem("obras", JSON.stringify(this.obras));
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", data.data.token);
                    this.router.navigate(['/dashboard']);
                }

            } else {
                this.estado = "determinate";
                this.messageService.add({
                    severity: 'error',
                    summary: 'COOB',
                    detail: data.headerApp.message
                });
            }
        }).catch(err => {
            console.log(err);

            this.estado = "determinate";
            this.messageService.add({
                severity: 'error',
                summary: 'COOB',
                detail: 'Error en la aplicación intentelo más tarde'
            });
        })

    }



}
