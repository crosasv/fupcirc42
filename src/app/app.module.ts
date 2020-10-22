import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import bootstrap from 'bootstrap';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { PersonalInformationFormComponent } from './components/personal-information/personal-information.component';
import { ModalPostulacionComponent } from './components/modal-postulacion/modal-postulacion.component';
import { ConstanciaPostulacionComponent } from './components/constancia-postulacion/constancia-postulacion.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    StudentFormComponent,
    PersonalInformationFormComponent,
    ModalPostulacionComponent,
    ConstanciaPostulacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
