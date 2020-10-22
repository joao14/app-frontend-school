import { BreadcrumbService } from './../services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { CustomTranslateLoader } from './custom-translate-loader';
import { SharedModule } from 'primeng/primeng';
import { RegisterModule } from './pages/register/register.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app.routes';


// Application Components
import { AppComponent } from './app.component';

//Para traducir
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule,
        RegisterModule,
        NgxDropzoneModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomTranslateLoader
            }
        })

    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        BreadcrumbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

