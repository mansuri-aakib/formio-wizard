import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SharedModule } from "../../shared.module";
import { FormioForm } from "@formio/angular";

@Component({
    selector:'cust-renderer',
    templateUrl:'./cust-renderer.component.html',
    standalone:true,
    imports:[SharedModule]
})
export class CustRenderer{
    @Input() value!: any;
    @Output() valueChange = new EventEmitter<any>();
   
    public form:FormioForm;
    public client:HttpClient = inject(HttpClient);
    public url='http://localhost/api/get_screen?screenId=1';

    // API request 
    constructor(){
        this.form = {};
        this.client.get(this.url).subscribe((res:any)=>{
            this.form = JSON.parse(res.Body.screenJson)
        });
    }
}
