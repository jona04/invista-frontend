import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { GraphsComponent } from './graphs/graphs.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SecureComponent,
    GraphsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SecureModule { }
