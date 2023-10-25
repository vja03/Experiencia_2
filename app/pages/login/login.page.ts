import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  userdata: any;  

  User={
    id: 0, 
    username:'',
    email:'',
    password:'',
    rol: '',
    asignatura:'',
    isactive: false
  }

  constructor(private menuController : MenuController,
              private alertController : AlertController,
              private router: Router,
              private authservice: AuthService,
              private toastcontroller: ToastController,
              private builder: FormBuilder) {
                this.loginForm = this.builder.group({
                'email' : new FormControl("", [Validators.required, Validators.minLength(4)]),
                'password': new FormControl("",[Validators.required, Validators.minLength(4)])
                  })
               }

  ngOnInit() {
  }
  MostrarMenu(){
    this.menuController.open('first')
  }

  async Enviar(){
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Ha iniciado sesion correctamente',
      buttons: ['OK'],
    });

    await alert.present();
    this.User.email='';
    this.User.password='';
  } 
  login(){
    if(this.loginForm.valid){
      this.authservice.GetUserById(this.loginForm.value.email).subscribe(resp=>{
        console.log('Datos del usuario', resp)
        this.userdata=resp;
        console.log(this.userdata);
        if(this.userdata.length>0){
          this.User = {
            id: this.userdata[0].id,
            username: this.userdata[0].username,
            email: this.userdata[0].email,
            password: this.userdata[0].password,
            rol: this.userdata[0].rol,
            asignatura: this.userdata[0].asignatura,
            isactive: this.userdata[0].isactive
          }

          if (this.User.password === this.loginForm.value.password){
            sessionStorage.setItem('username', this.User.username);
            sessionStorage.setItem('role', this.User.rol);
            sessionStorage.setItem('ingresado', 'true');
            this.showToast('Sesion Iniciada');
            this.router.navigateByUrl("/info");
          }

        }
      },
      error =>{
        console.error('Error en la solicitud', error);
      }
      );

    }
  }

  async showToast(msg: any){
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }
}
