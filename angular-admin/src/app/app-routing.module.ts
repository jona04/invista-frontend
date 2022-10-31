import { LoginComponent } from './public/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { RegisterComponent } from './public/register/register.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { UserComponent } from './secure/user/user.component';
import { ClientesComponent } from './secure/clientes/clientes.component';
import { ClientesFormComponent } from './secure/clientes/clientes-form/clientes-form.component';
import { ServicosFormComponent } from './secure/servicos/servicos-form/servicos-form.component';
import { ServicosComponent } from './secure/servicos/servicos.component';
import { NotasComponent } from './secure/notas/notas.component';
import { NotasFormComponent } from './secure/notas/notas-form/notas-form.component';
import { NotasPrintComponent } from './secure/notas/notas-print/notas-print.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {path: '', pathMatch:'full', redirectTo: 'users'},
      {path: 'profile', component: ProfileComponent},
      {path: 'users', component: UserComponent},
      {path: 'clientes', component: ClientesComponent},
      {path: 'clientes/criar', component: ClientesFormComponent, data: {create: true}},
      {path: 'clientes/:id/edit', component: ClientesFormComponent, data: {create: false}},
      {path: 'servicos', component: ServicosComponent},
      {path: 'servicos/criar', component: ServicosFormComponent, data: {create: true}},
      {path: 'servicos/:id/edit', component: ServicosFormComponent, data: {create: false}},
      {path: 'notas', component: NotasComponent},
      {path: 'notas/criar', component: NotasFormComponent, data: {create: true}},
      {path: 'notas/:id/edit', component: NotasFormComponent, data: {create: false}},
    ]
  },
  {path: 'notas/:id/print', component: NotasPrintComponent},
  {
    path: '',
    component: PublicComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
