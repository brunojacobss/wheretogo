import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  responseAuthenticateUser: any = {};
  messageAuthenticated: string;
  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'El email es requerido.',
      },
      { type: 'pattern', message: 'El email no es válido.' },
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña es requerida',
      },
      {
        type: 'minlength',
        message: 'La contraseña debe tener mínimo 6 caracteres.',
      },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private navController: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  async authenticateUser(credentials: any) {
    try {
      this.responseAuthenticateUser = await this.authenticateService.signIn(
        credentials
      );
      if (this.responseAuthenticateUser.isAuthenticated) {
        await this.storage.set('isAuthenticated', true);
        await this.storage.set('loggedUser', this.responseAuthenticateUser);
        this.navController.navigateForward('/menu/home');
      } else {
        this.messageAuthenticated = this.responseAuthenticateUser.message;
      }
      console.log(this.responseAuthenticateUser);
    } catch (err) {
      console.log(err);
    }
  }

  goToRegister() {
    this.navController.navigateForward('/register');
  }

  ngOnInit() {}
}
