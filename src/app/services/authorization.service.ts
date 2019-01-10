import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  public logUser(email, password) {
    console.log('Quiere iniciar sesión');
  }

  public registerUser(email, password) {
    console.log('Quiere registrarse');
    this.angularFireAuth.auth.createUserWithEmailAndPassword()
  }

}
