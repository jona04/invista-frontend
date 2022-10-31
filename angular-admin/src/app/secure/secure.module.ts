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
    MatIconModule
  ]
})
export class SecureModule { }
