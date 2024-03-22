import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { RendererService } from "../../service/global renderer.service";
import { MainRendererComponent } from "../../components/main renderer/main-renderer.component";
import { FormioUtils } from "@formio/angular";

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
    public formSubmissionLoad:boolean = false;
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
        console.log(this.value);
        if(this.value !== undefined){
            console.log(this.value);
            this.formSubmission = { data: this.value };
            this.formSubmissionLoad = true;
        }
        if (this.value !== undefined && this.value !== null && this.value.screenId !== undefined) {
            this.screenId = this.value.screenId;
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
        this.submitValue(event);
    }

    submitValue(event: any) {
        // console.log('submit value', event);
        this.value = event;
        this.valueChange.emit(this.value);
    }

}