import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { FormioForm } from "@formio/angular";
import { GlobalService } from "../../service/global.service";

@Component({
    selector:'cust-renderer',
    templateUrl:'./cust-renderer.component.html',
    standalone:true,
    imports:[SharedModule]
})
export class CustRenderer implements OnChanges{
    public form!:FormioForm;
    public service:GlobalService = inject(GlobalService);
    @Output() valueChange = new EventEmitter<any>();
    @Input() value:any;

    constructor(){
        console.log('constructor');
        this.valueChange.subscribe(()=>{
            console.log('valuechange');
        })
    }
    
    ngOnInit(){
        console.log('OnInit');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges');
        this.getScreen();
    }

    getScreen(){
        console.log('get screen');
        if(this.value !== undefined && this.value!.screenId !== undefined){
            this.form = this.service.get(this.value.screenId)[0];
            console.log(this.form);
        }
    }
}
