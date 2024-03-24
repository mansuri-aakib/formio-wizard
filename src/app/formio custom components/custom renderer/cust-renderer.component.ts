import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { RendererService } from "../../service/global renderer.service";
import { MainRendererComponent } from "../../components/main renderer/main-renderer.component";
import { FormioUtils } from "@formio/angular";
import { Form } from "@formio/js";
import { load } from "@syncfusion/ej2-angular-grids";

@Component({
    selector: 'cust-renderer',
    templateUrl: './cust-renderer.component.html',
    providers: [RendererService],
    standalone: true,
    imports: [SharedModule, MainRendererComponent]
})
export class CustRenderer implements OnChanges {
    public rendererService: RendererService = inject(RendererService);
    public formSubmission: any;
    public formSubmissionLoad: boolean = false;
    public screenId: any;
    @Output() valueChange = new EventEmitter<any>();
    @Input() value: any;
    @ViewChild('instance') instance: any;


    constructor() {
        // this.rendererService.loadFormSubmission.subscribe((submission: any) => {
        //     this.formSubmission = { data: submission };
        // })
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(this.value);
        if (this.value !== undefined && !('component' in this.value)) {
            console.log('form submission ', this.value);
            this.formSubmission = { data: this.value };
            this.formSubmissionLoad = true;
        }
        if (this.value !== undefined && this.value?.component !== undefined && this.value.component?.screenId !== undefined) {
            this.screenId = this.value.component.screenId;
            this.value = this.value.data;
            // console.log(this.instance);
            this.value = this.instance.instance.formio?._data;
            this.submitValue(this.value)
            // console.log(this.value);
            
            // console.log();
            
        }
        else if (this.value !== undefined && this.value !== null && this.value!.id !== null) {
            this.screenId = this.value.id;
        }
    }

    changeValue(event: any) {
        // if (event?.key !== undefined && event?.value !== undefined && event?.instance !== undefined) {
        //     if (event.key in this.value) {
        //         if(this.value[event.key] !== event.value){
        //             this.value[event.key] = event.value;
        //         }
        //     } else {
        //         const tempValue: { [key: string]: any } = {};
        //         event.instance.form.components.forEach((obj: any) => {
        //             tempValue[obj.key] = this.value[obj.key] !== undefined ? this.value[obj.key] : '';
        //             console.log(obj.key,FormioUtils.getValue(event.instance.submission,obj.key));

        //         });
        //         tempValue[event.key] = event.value;
        //         this.submitValue(tempValue);
        //     }
        // }

        // if(this.instance?.form !== undefined)
        // {
        //     let comps = FormioUtils.flattenComponents(this.instance.form.components,true)
        //     console.log(comps);
            
        //     Object.keys(comps)
        //     .forEach((key: any) => {
        //         // console.log(FormioUtils.);
                
        //         // console.log(Form);
                
        //         console.log(key,FormioUtils.getComponent([comps[key]],key,true));
        //         console.log(key,FormioUtils.getValue({data:comps[key]},key));
        //     });      
        // }
        // console.log(event);

        // this.submitValue(event);
    }

    submitValue(event: any) {
        // console.log('submit value', event);
        this.value = event;
        this.valueChange.emit(this.value);
    }

}