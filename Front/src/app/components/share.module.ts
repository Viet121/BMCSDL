import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareRoutingModule } from './share-routing.module';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavHeaderComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule
  ],
  exports:[
    NavHeaderComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ShareModule { }
