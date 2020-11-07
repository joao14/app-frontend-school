import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css'],
    providers: [MessageService],
})
export class ForgotComponent implements OnInit {

    checkoutForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.checkoutForm = this.formBuilder.group({
            email: ''
        });
    }

    ngOnInit(): void {
        console.log('Validando el correo');
        
    }

    onSubmit(){
        console.log('Se está enviando el email');

    }

}
