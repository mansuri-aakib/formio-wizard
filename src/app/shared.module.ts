import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FormioModule } from "@formio/angular";

@NgModule({
    imports:[
        RouterOutlet,
        RouterLink,
        FormsModule,
        FormioModule,
        CommonModule,
        HttpClientModule
    ],
    exports:[
        RouterOutlet,
        RouterLink,
        FormsModule,
        FormioModule,
        CommonModule,
        HttpClientModule
    ],
})
export class SharedModule{}