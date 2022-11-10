import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { GraphsComponent } from './main/secure/graphs/graphs.component';
import { SecureComponent } from './main/secure/secure.component';
import { FrontComponent } from './main/front/front.component';
import { GraphServicosComponent } from './main/secure/graphs/graph-servicos/graph-servicos.component';
import { GraphNotasComponent } from './main/secure/graphs/graph-notas/graph-notas.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: FrontComponent},
      {
        path: '',
        component: SecureComponent,
        children: [
          {
            path: 'graphs', component: GraphsComponent,
            children: [
              {path: 'servicos', component: GraphServicosComponent},
              {path: 'notas', component: GraphNotasComponent}
            ]
          }
        ]
      }
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
