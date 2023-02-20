import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(private _fb: FormBuilder, private _afAuth: AngularFireAuth, private _router: Router, 
    private _toastr: ToastrService, private _errorService: ErrorService) {
    this.registerForm = this._fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: [''],
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
  }

  register() {
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;
    this.loading = true;

    this._afAuth.createUserWithEmailAndPassword(usuario, password).then(response => {
      console.log('response');
      console.log(response);
      response.user?.sendEmailVerification();
      this._toastr.success(usuario + ' Verifique su correo electronico', 'Usuario Creado');
      this._router.navigate(['/usuario']);
    }).catch(error => {
      console.log('error');
      console.log(error);
      this.loading = false;
      this.registerForm.reset();
      this._toastr.error(this._errorService.error(error.code), 'Error');
    });
  }

  checkPassword(group: FormGroup): any {
    const password = group.controls['password']?.value;
    const confirmPassword = group.controls['repetirPassword']?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

}
