import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegistrarPage } from './pages/registrar/registrar.page';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio', 
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login', component: LoginPage,
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)

  },
  {
    path: 'registrar', component: RegistrarPage,
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path: 'tipo-user',
    loadChildren: () => import('./pages/tipo-user/tipo-user.module').then( m => m.TipoUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
