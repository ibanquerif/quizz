import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo ya esta registrado';

      case 'auth/invalid-email':
        return 'El correo es invalido';

      case 'auth/weak-password':
        return 'El correo es muy debil';

      case 'auth/user-not-found':
        return 'Usuario Invalido';

      case 'auth/wrong-password':
      return 'La contraseña es invalida';
    
      default:
        return 'Error Desconocido';
    }
  }
}
