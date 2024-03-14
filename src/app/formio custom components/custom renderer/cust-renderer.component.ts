import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { FormioForm } from "@formio/angular";
import { GlobalService } from "../../service/global.service";

@Component({
    selector:'cust-renderer',
    templateUrl:'./cust-renderer.component.html',
    standalone:true,
    imports:[SharedModule]
})
export class CustRenderer{
    @Input() value!: any;
    @Output() valueChange = new EventEmitter<any>();
   
    public form!:FormioForm;
    private service:GlobalService = inject(GlobalService);

    constructor(){
        this.service.emitter.subscribe((data:any)=>{
            this.form = data;
        });
    }
}
