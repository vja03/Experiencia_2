import { Component } from '@angular/core';

  interface Componente{
    name:string;
    icon: string;
    redirecTo: string;
  }

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  componentes : Componente[]=[
    {
      name:'Inicio',
      icon:'home-outline',
      redirecTo:'/inicio'
    },
    {
      name: 'Login',
      icon: 'person-outline',
      redirecTo:'/login'
    },
    {

      name:'Registar',
      icon:'person-outline',
      redirecTo:'/registrar'
    },
    {
      name:'Info',
      icon:'search-circle-outline',
      redirecTo:'/info'
      
    }
  ]
}
