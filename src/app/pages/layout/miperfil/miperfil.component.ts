import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from './../../../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-miperfil',
    templateUrl: './miperfil.component.html',
    styleUrls: ['./miperfil.component.css'],
    providers: [TranslateService],
})
export class MiperfilComponent implements OnInit {

    user: user;
    public imagePath;
    imgURL: any;
    public message: string;
    enabled: boolean = true;
    profileForm: FormGroup;
    email_: string;
    texto: string;

    constructor(private fb: FormBuilder) {
        this.profileForm = this.fb.group({
            identification: ['', [Validators.required, Validators.minLength(10)]],
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]]
        });
    }
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log('USUARIO FINAL');
        console.log(this.user);
        this.profileForm.get('identification').setValue(this.user.dni);
        this.profileForm.get('name').setValue(this.user.name);
        this.profileForm.get('lastname').setValue(this.user.lastname);
        this.profileForm.get('email').setValue(this.user.email);
        console.log('FORMULARIO????');
        console.log(this.profileForm.value);
    }

    get identification() {
        return this.profileForm.get('identification');
    }

    get name() {
        return this.profileForm.get('name');
    }

    get lastname() {
        return this.profileForm.get('lastname');
    }

    get email() {
        return this.profileForm.get('email');
    }



    preview(files) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    modify() {
        console.log('Listo para poder modificar el perfil');
        this.enabled = false;
    }

    cancel() {
        console.log('Cancelar los cambios');
        this.enabled = true;
    }

    sendData() {
        console.log('Se va a enviar toda la información del usuario');
        console.log(this.user);

    }

}
