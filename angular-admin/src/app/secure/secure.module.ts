import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { SecureComponent } from './secure.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ServicosComponent } from './servicos/servicos.component';
import { ServicosFormComponent } from './servicos/servicos-form/servicos-form.component';
import {MatSelectModule} from '@angular/material/select';
import { NotasComponent } from './notas/notas.component';
import { NotasFormComponent } from './notas/notas-form/notas-form.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { NotasPrintComponent } from './notas/notas-print/notas-print.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { EntradaComponent } from './estoque/entrada/entrada.component';
import { SaidaComponent } from './estoque/saida/saida.component';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { EntradaFormComponent } from './estoque/entrada/entrada-form/entrada-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { SaidaFormComponent } from './estoque/saida/saida-form/saida-form.component';
import { ChapasComponent } from './chapas/chapas.component';
import { NotasRelatorioComponent } from './notas/notas-relatorio/notas-relatorio.component';
import { ChapasFormComponent } from './chapas/chapas-form/chapas-form.component';
import { EntradaCategoriaFormComponent } from './estoque/entrada/entrada-categoria-form/entrada-categoria-form.component';
import { SaidaCategoriaFormComponent } from './estoque/saida/saida-categoria-form/saida-categoria-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateServicoDialogComponent } from './notas/notas-form/notas-form.component';

@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    MenuComponent,
    ProfileComponent,
    UserComponent,
    ClientesComponent,
    ClientesFormComponent,
    ServicosComponent,
    ServicosFormComponent,
    NotasComponent,
    NotasFormComponent,
    NotasPrintComponent,
    EstoqueComponent,
    EntradaComponent,
    SaidaComponent,
    EntradaFormComponent,
    SaidaFormComponent,
    ChapasComponent,
    NotasRelatorioComponent,
    ChapasFormComponent,
    EntradaCategoriaFormComponent,
    SaidaCategoriaFormComponent,
    CreateServicoDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class SecureModule { }
