import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public isAdmin: boolean;

    constructor(
        private httpClient: HttpClient
    ) {
        this.isAdmin = this.isUserAdmin();
    }

    authenticate(username, password) {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<User>('http://localhost:8080/login/validateLogin', { headers }).pipe(
            map(
                userData => {
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('password', password);
                    this.isAdmin = this.isUserAdmin();
                    return userData;
                }
            )

        );
    }

    isUserAdmin() {
        const user = sessionStorage.getItem('username');
        return user === 'admin';
    }

    isUserLoggedIn() {
        const user = sessionStorage.getItem('username');
        return !(user === null);
    }

    logout() {
        this.isAdmin = this.isUserAdmin();
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
    }
}
