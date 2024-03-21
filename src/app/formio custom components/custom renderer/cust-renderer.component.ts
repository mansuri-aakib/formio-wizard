import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { RendererDirective } from "../../directives/renderer.directive";
import { RendererService } from "../../service/global renderer.service";
import { MainRendererComponent } from "../../components/main renderer/main-renderer.component";

@Component({
    selector: 'cust-renderer',
    templateUrl: './cust-renderer.component.html',
    providers: [RendererService],
    standalone: true,
    imports: [SharedModule, MainRendererComponent]
})
export class CustRenderer implements OnChanges {
    public formSubmission: any;
    public rendererService: RendererService = inject(RendererService);
    public screenId:any;
    @Output() valueChange = new EventEmitter<any>();
    @Input() value: any;


    constructor() {
        // this.rendererService.loadFormSubmission.subscribe((submission: any) => {
        //     this.formSubmission = { data: submission };
        // })
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this.getScreen();
        if (this.value !== undefined && this.value !== null && this.value.screenId !== undefined) {
            this.screenId = this.value.screenId;
        }
        else if(this.value !== undefined && this.value !== null && this.value!.id !== null){
            this.screenId = this.value.id;
        }
        console.log('custom changes',this.value);        
    }

    changeValue(event:any){
        console.log('submit',event);
        this.value = event;
        this.valueChange.emit(this.value);
    }

}