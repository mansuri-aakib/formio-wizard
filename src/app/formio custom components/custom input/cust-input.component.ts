import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedModule } from "../../shared.module";

@Component({
    selector:'cust-rinput',
    templateUrl:'./cust-input.component.html',
    standalone:true,
    imports:[SharedModule]
})
export class CustInput{
    @Input() value!: any;
    @Output() valueChange = new EventEmitter<any>();
   
    // API request 
    constructor(){
        this.valueChange.subscribe((event:any)=>{
            console.log(event.target.value);
        })
    }
}
