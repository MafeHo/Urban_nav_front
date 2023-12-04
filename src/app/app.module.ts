import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/master-page/header/header.component';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { SidebarComponent } from './public/master-page/sidebar/sidebar.component';
import { RouteNotfoundComponent } from './public/errors/route-notfound/route-notfound.component';
import { ServerFailureComponent } from './public/errors/server-failure/server-failure.component';
import { HomeComponent } from './public/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientHomeComponent } from './public/client-home/client-home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouteNotfoundComponent,
    ServerFailureComponent,
    HomeComponent,
    ClientHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
