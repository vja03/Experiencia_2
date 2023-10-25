import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from 'src/app/servicios/apicrud.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})


export class RegistrarPage implements OnInit {

  registroForm: FormGroup;

  userdata: any;
  
  newUser: Usuario={
    id: this.generarID(),
    username:'',
    email:'',
    password:'',
    rol:'',
    asignatura:'',
    isactive: true
  }
  
  constructor(private menuController : MenuController,
              private alertController: AlertController,
              private apiCrud : ApicrudService,
              private router : Router,
              private builder: FormBuilder) {
                this.registroForm = this.builder.group({
                  'username': new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'rol': new FormControl("", Validators.required)
                })
               }

  ngOnInit() {
  }
  MostrarMenu(){
   this.menuController.open('first');
  }

  async Enviar(){
    const alert = await this.alertController.create({
      header: 'Gracias!' + ' '+ this.newUser.username,
      message: 'Se Ha registrado Correctamente',
      buttons: ['OK'],
    });

    await alert.present();
    this.newUser.username='';
    this.newUser.email='';
    this.newUser.password='';
    this.newUser.rol='';
    this.newUser.asignatura='';


  }
  crearUser(){
    this.apiCrud.CrearUsuario(this.newUser).subscribe(
      (response) => {
        console.log('Registro Exitoso', response);
        this.Enviar();
      },
      (error) => {
        console.error('Error al registrar', error);
      }
    );
  }
  private generarID(): number{
    return Math.floor((Math.random() * 900000000) + 100000);
  }
  get rolControl(){
    return this.registroForm.get('rol');
  }
  onRolChange() {
    const rol = this.registroForm?.get('rol')?.value; // Utiliza el operador de navegación segura '?' para acceder a propiedades opcionales
  
    if (rol === 'alumno') {
      this.registroForm?.get('asignatura')?.setValue('ninguna'); // Navegación segura también aquí
    }
  }
}
