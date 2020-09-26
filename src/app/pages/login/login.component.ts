import { roles } from './../../../models/roles';
import { Router } from '@angular/router';
import { user } from './../../../models/user';
import { ApisService } from './../../../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {

    checkoutForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private messageService: MessageService, private api: ApisService, private router: Router) {
        this.checkoutForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    ngOnInit(): void {

    }

    onSubmit() {
        console.log('Your order has been submitted 2.....');
        console.log(this.checkoutForm.get("username").value);

        //this.api.login(this.checkoutForm.get("username").value, this.checkoutForm.get("password").value).then(data => {
        this.api.login('admin', '5lCKao').then(data => {
            console.log("Data response");
            console.log(data);
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
                let user: user = {
                    dni: data.data.usuario.dni,
                    email: data.data.usuario.email,
                    state: data.data.usuario.estado,
                    name: data.data.usuario.nombres,
                    lastname: data.data.usuario.apellidos,
                    roles: roles_,
                    photo: 'https://previews.123rf.com/images/djvstock/djvstock1508/djvstock150806855/44096519-web-developer-design-vector-illustration-eps-10-.jpg'
                                }
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", data.data.usuario.token);
                this.router.navigate(['/dashboard']);

            } else {
                console.log('No se puede loguear');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rosa Mística',
                    detail: 'Usuario/Password incorrectos'
                });
            }
        }).catch(err => {
            this.messageService.add({
                severity: 'error',
                summary: 'Rosa Mística',
                detail: 'Error en la aplicación intentelo más tarde'
            });

            console.log(err);
        })

    }


}
