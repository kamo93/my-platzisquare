import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearComponent } from './crear/crear.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import { ResaltarDirective } from './directives/resaltar.directive';
import { LoginComponent } from './login/login.component';
import { LugaresComponent } from './lugares/lugares.component';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { OutstandingFilterPipe } from './pipes/outstanding-filter.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { LugaresService } from './services/lugares.service';

const routesPaths: Routes = [
  { path: '', component: LugaresComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'crear/new', component: CrearComponent },
  { path: 'crear/edit', component: CrearComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistrationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    OutstandingFilterPipe,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWx67FbNDv1uqiBPzapslE9R-C-eD2yuA'
    }),
    RouterModule.forRoot(routesPaths),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    NgxSpinnerModule, // Loader module
    BrowserAnimationsModule,
  ],
  providers: [LugaresService],
  bootstrap: [AppComponent]
})
export class AppModule {}
