import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { FormioForm } from "@formio/angular";
import { GlobalService } from "../../service/global.service";

@Component({
    selector: 'cust-renderer',
    templateUrl: './cust-renderer.component.html',
    standalone: true,
    imports: [SharedModule]
})
export class CustRenderer implements OnChanges {
    public form!: FormioForm;
    public rendererOption: any;
    public service: GlobalService = inject(GlobalService);
    @Output() valueChange = new EventEmitter<any>();
    @Input() value: any;

    constructor() {
        this.rendererOption = {
            sanitizeConfig: {
                allowedTags: ['sync-grid', 'cust-renderer'],
                addTags: ['sync-grid', 'cust-renderer']
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getScreen();
    }

    getScreen() {
        console.log(this.value);
        if (this.value !== undefined && this.value !== null && this.value!.screenId !== null) {
            this.form = this.service.get(this.value.screenId)[0];
        }
    }

    onSubmitForm(event: any) {
        console.log("Custom renderer submission: ", event);
    }
}