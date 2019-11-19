import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import {
  FieldsetModule, InputTextModule,
  OverlayPanelModule, TooltipModule, ButtonModule, MessageService
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { AppRoutingModule, routingComponentes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './login/login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CepService } from './cep/cep.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { NgxMaskModule } from "ngx-mask";
import { InputCleanDirective } from './_directives/input-clean.directive';
import { CpfPipe } from './helper/cpf.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponentes,
    InputCleanDirective,
    CpfPipe
  ],
  imports: [
    CardModule,
    OverlayPanelModule,
    TooltipModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FieldsetModule,
    InputTextModule,
    NgSelectModule,
    ButtonModule,
    MenuModule,
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    TabMenuModule,
    MessageModule,
    MessagesModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [InputCleanDirective, CpfPipe],
  providers: [MessageService, CepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
