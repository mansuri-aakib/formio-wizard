import { EventEmitter, Injectable, inject } from "@angular/core";
import { GlobalSubmissionService } from "../service/global submission.service";
import { GlobalFetchingService } from "../service/global fetching.service";

@Injectable()
export class RendererService {
    public form: any;
    public submissionService: GlobalSubmissionService = inject(GlobalSubmissionService);
    public fetchingService: GlobalFetchingService = inject(GlobalFetchingService);
    submitForm: EventEmitter<any> = new EventEmitter();
    loadFormSubmission: EventEmitter<any> = new EventEmitter();

    public rendererOption = {
        sanitizeConfig: {
            allowedTags: ['sync-grid', 'cust-renderer'],
            addTags: ['sync-grid', 'cust-renderer']
        }
    }

    constructor() { }

    onTemplateSelectEvent(id: any) {
        if (id !== undefined) {
            this.form = this.fetchingService.get(id)[0];
            return this.form;
        }
    }

    onSubmit(event: any) {
        console.log("submit: ", event.data);
        this.submitForm.emit(event);

        let { submit, ...data } = event.data;
        data = { ...data, id: this.form.id };

        let existingData = localStorage.getItem('FormsSubmissionJson');
        if (existingData === null) {
            localStorage.setItem('FormsSubmissionJson', JSON.stringify([data]));
        }

        else {
            let formsSubmissionJson = JSON.parse(existingData);
            let alreadyExistFormSubmission: boolean = false;
            let alreadyExistFormSubmissionIndex: number = -1;

            formsSubmissionJson.forEach((submission: any, index: number) => {
                if (submission.id == this.form.id) {
                    alreadyExistFormSubmission = true;
                    alreadyExistFormSubmissionIndex = index;
                }
            });

            if (alreadyExistFormSubmission) {
                formsSubmissionJson[alreadyExistFormSubmissionIndex] = data;
            }
            else {
                formsSubmissionJson.push(data);
            }
            localStorage.setItem('FormsSubmissionJson', JSON.stringify(formsSubmissionJson));
        }
    }

    onChange(event: any) {
        // console.log("change: ", event);
    }

    onFormLoad(event: any) {
        this.submissionService.get(this.form.id)[0];
        this.loadFormSubmission.emit(this.submissionService.get(this.form.id)[0]);
    }
}