import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(private _fb: FormBuilder, private _afAuth: AngularFireAuth, private _toastr: ToastrService,
    private _errorService: ErrorService, private _router: Router) {
    this.loginForm = this._fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login() {
    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loading = true;

    this._afAuth.signInWithEmailAndPassword(usuario, password).then(response => {
      console.log('response');
      console.log(response);

      if (response.user?.emailVerified === false) {
        this._router.navigate(['/usuario/verificarCorreo'])
      } else {
        // lo redireccionamos al dashboard
        console.log('ir a dashboard');
      }

      this.loading = false;
    }).catch(error => {
      console.log('error');
      console.log(error);
      this.loading = false;
      this.loginForm.reset();
      this._toastr.error(this._errorService.error(error.code), 'Error');
    });
  }

}
