import { Directive, EventEmitter, HostListener, Output, inject } from "@angular/core";
import { GlobalSubmissionService } from "../service/global submission.service";
import { GlobalFetchingService } from "../service/global fetching.service";

@Directive({
    selector: '[Renderer]',
    standalone: true
})
export class RendererDirective {
    public form:any;
    public submissionService:GlobalSubmissionService = inject(GlobalSubmissionService);
    public fetchingService:GlobalFetchingService = inject(GlobalFetchingService);
    @Output() submitForm: EventEmitter<any> = new EventEmitter();
    @Output() loadFormSubmission: EventEmitter<any> = new EventEmitter();
    @Output() loadFormJson: EventEmitter<any> = new EventEmitter();
    

    constructor() {}

    @HostListener('window:templateSelectEvent', ['$event']) onTemplateSelectEvent(event: any) {
        if('event' in event.detail){
            this.form = this.fetchingService.get(event.detail.event.target.value)[0];
        }
        else{
            this.form = this.fetchingService.get(event.detail.id)[0];
        }
        this.loadFormJson.emit(this.form);
    }

    // @HostListener('beforeSubmit', ['$event']) onBeforeSubmit(event: any) {
    //     console.log("beforeSubmit: ", event);
    // }

    @HostListener('submit', ['$event']) onSubmit(event: any) {
        console.log("submit: ", event);
        this.submitForm.emit(event);
        
        let {submit,...data} = event.data;
        data = {...data,id: this.form.id};

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

    // @HostListener('change', ['$event']) onChange(event: any) {
    //     console.log("change: ", event);
    // }

    @HostListener('formLoad', ['$event']) onFormLoad(event: any) {
        console.log("formLoad: ", event);
        this.form.id = event.id
        this.loadFormSubmission.emit(this.submissionService.get(this.form.id)[0]);
    }

    // @HostListener('nextPage', ['$event']) onNextPage(event: any) {
    //     console.log("nextPage: ", event);
    // }

    // @HostListener('prevPage', ['$event']) onPrevPage(event: any) {
    //     console.log("prevPage: ", event);
    // }

    // @HostListener('ready', ['$event']) onReady(event: any) {
    //     console.log("ready: ", event);
    // }

    // @HostListener('render') onRender() {
    //     console.log("render:");
    // }

    // @HostListener('submissionLoad', ['$event']) onSubmissionLoad(event: any) {
    //     console.log("SubmissionLoad:", event);
    // }

    // @HostListener('submitForm', ['$event']) onSubmitForm(event: any) {
    //     console.log("submitForm:", event);
    // }

}