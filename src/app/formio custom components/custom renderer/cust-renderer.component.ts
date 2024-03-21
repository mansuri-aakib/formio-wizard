import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { RendererDirective } from "../../directives/renderer.directive";
import { RendererService } from "../../service/global renderer.service";

@Component({
    selector: 'cust-renderer',
    templateUrl: './cust-renderer.component.html',
    providers: [RendererService],
    standalone: true,
    imports: [SharedModule, RendererDirective]
})
export class CustRenderer implements OnChanges {
    public formSubmission: any;
    public rendererService: RendererService = inject(RendererService);
    @Output() valueChange = new EventEmitter<any>();
    @Input() value: any;

    constructor() {
        this.rendererService.loadFormSubmission.subscribe((submission: any) => {
            this.formSubmission = { data: submission };
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getScreen();
    }

    getScreen() {
        if (this.value !== undefined && this.value !== null && this.value!.screenId !== null) {
            this.rendererService.onTemplateSelectEvent(this.value.screenId);
        }
    }

}