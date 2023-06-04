import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UserModule } from './user-modules/user.module';
import { GeneralModule } from './general-modules/general.module';
import { SharedModule } from './shared-modules/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    UserModule,
    GeneralModule,
    SharedModule,
    CommonModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
