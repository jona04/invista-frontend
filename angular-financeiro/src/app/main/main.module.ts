import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { NavComponent } from './nav/nav.component';
import { SecureModule } from './secure/secure.module';
import { SharedModule } from '../shared/shared.module';
import { FrontComponent } from './front/front.component';


@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FrontComponent,
  ],
  imports: [
    SharedModule,
    SecureModule
  ]
})
export class MainModule { }
