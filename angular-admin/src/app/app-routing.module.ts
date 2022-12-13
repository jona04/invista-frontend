import { SaidaCategoriaFormComponent } from './secure/estoque/saida/saida-categoria-form/saida-categoria-form.component';
import { ChapasComponent } from './secure/chapas/chapas.component';
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
import { EstoqueComponent } from './secure/estoque/estoque.component';
import { EntradaComponent } from './secure/estoque/entrada/entrada.component';
import { SaidaComponent } from './secure/estoque/saida/saida.component';
import { EntradaFormComponent } from './secure/estoque/entrada/entrada-form/entrada-form.component';
import { SaidaFormComponent } from './secure/estoque/saida/saida-form/saida-form.component';
import { NotasRelatorioComponent } from './secure/notas/notas-relatorio/notas-relatorio.component';
import { ChapasFormComponent } from './secure/chapas/chapas-form/chapas-form.component';
import { EntradaCategoriaFormComponent } from './secure/estoque/entrada/entrada-categoria-form/entrada-categoria-form.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {path: '', pathMatch:'full', redirectTo: 'chapas'},
      {path: 'profile', component: ProfileComponent},
      {path: 'users', component: UserComponent},
      {path: 'chapas', component: ChapasComponent},
      {path: 'chapas/criar', component: ChapasFormComponent, data: {create: true}},
      {path: 'chapas/:id/edit', component: ChapasFormComponent, data: {create: false}},
      {path: 'clientes', component: ClientesComponent},
      {path: 'clientes/criar', component: ClientesFormComponent, data: {create: true}},
      {path: 'clientes/:id/edit', component: ClientesFormComponent, data: {create: false}},
      {path: 'servicos', component: ServicosComponent},
      {path: 'servicos/criar', component: ServicosFormComponent, data: {create: true}},
      {path: 'servicos/:id/edit', component: ServicosFormComponent, data: {create: false}},
      {path: 'notas', component: NotasComponent},
      {path: 'notas/criar', component: NotasFormComponent, data: {create: true}},
      {path: 'notas/:id/edit', component: NotasFormComponent, data: {create: false}},
      {path: 'estoque', component: EstoqueComponent},
      {path: 'estoque/entrada', component: EntradaComponent},
      {path: 'estoque/entrada/criar', component: EntradaFormComponent},
      {path: 'estoque/entrada/categoria/criar', component: EntradaCategoriaFormComponent},
      {path: 'estoque/saida', component: SaidaComponent},
      {path: 'estoque/saida/criar', component: SaidaFormComponent},
      {path: 'estoque/saida/categoria/criar', component: SaidaCategoriaFormComponent},
    ]
  },
  {path: 'notas/:id/print', component: NotasPrintComponent},
  {path: 'notas/relatorio/:start/:end', component: NotasRelatorioComponent},
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
