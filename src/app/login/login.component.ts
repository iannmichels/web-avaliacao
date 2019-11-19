import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { MessageService } from 'primeng/api';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    invalidLogin = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
    ) {

        if (this.authenticationService.isUserLoggedIn) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    limpar() {
        this.loginForm.reset();
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.authenticate(this.f.username.value, this.f.password.value).subscribe(
            res => {
                this.router.navigate(['/pessoas']);
                this.invalidLogin = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Login realizado com sucesso!'
                });
            },
            error => {
                this.loading = false;
                this.invalidLogin = true;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: 'Usuário ou senha incorretos!'
                });
            });

    }
}
