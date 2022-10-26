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
    ]
  },
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
