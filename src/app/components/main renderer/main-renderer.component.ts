import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'formio-main-renderer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main-renderer.component.html'
})
export class MainRendererComponent implements OnChanges {
  public form: any;
  public rendererOption: any;
  @Input() formSubmission: any;
  @Input() formSubmissionLoad: any;
  @Input() screenId: any;
  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() onChangeEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('instance') instance: any;

  constructor() { }

  ngOnInit(): void {
    this.rendererOption = {
      sanitizeConfig: {
        allowedTags: ['sync-grid', 'cust-renderer'],
        addTags: ['sync-grid', 'cust-renderer']
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.screenId !== undefined) {
      this.fetchFormJsonFromLocal();
    }
  }

  private fetchSubmissionJsonFromLocal() {
    let existingData = localStorage.getItem('FormsSubmissionJson');
    if (existingData !== null) {
      let formsSubmissionJson = JSON.parse(existingData);
      // this.formSubmission = this.formSubmission !== undefined ? this.formSubmission : { data: formsSubmissionJson.filter((temp: any) => temp.id == this.screenId)[0] };
      this.formSubmission = { data: formsSubmissionJson.filter((temp: any) => temp.id == this.screenId)[0] };
    }
  }

  private fetchFormJsonFromLocal() {
    let existingData = localStorage.getItem('FormsJson');
    if (existingData !== null) {
      let formTemplates = JSON.parse(existingData);
      this.form = formTemplates.filter((temp: any) => temp.id == this.screenId)[0];
    }
  }

  onFormLoad(event: any) {
    // console.log('Formload',event);
    if (this.screenId !== undefined && !this.formSubmissionLoad) {
      this.fetchSubmissionJsonFromLocal();
    }
  }

  OnSubmit(event: any) {
    console.log('submit', event);
    // Object.keys(event.data).forEach(key => {
    //   if(key == 'Custom Renderer Login Screen')
    //   {
    //     // console.log(`${key}: `, FormioUtils.getValue(event,key));
    //   }
    //   console.log(`${key}: `, FormioUtils.getValue(event,key));
    // });

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
    this.onSubmitEvent.emit(data);
  }

  onBeforeSubmit(event: any) {
    // console.log("beforeSubmit: ", event);
  }

  onChange(event: any) {
    // console.log("change: ", event);
    if(this.formSubmissionLoad && this.formSubmission != undefined &&this.formSubmission != this.mainSubmission){
      this.mainSubmission = this.formSubmission;
      console.log(this.formSubmission)
    }

    if (this.formSubmission != event.data) {
      // console.log('change event',event);
      // console.log('change event',{key: event?.changed?.component?.key, value:event?.changed?.value});
      // this.onChangeEvent.emit({ 
      //                           key: event?.changed?.component?.key, 
      //                           value: event?.changed?.value, 
      //                           instance: this.instance 
      //                         });
      this.onChangeEvent.emit(event.data);
    }
    // debugger
    // this.formSubmission = {data:event.data};
  }

  onNextPage(event: any) {
    // console.log("nextPage: ", event);
  }

  onPrevPage(event: any) {
    // console.log("prevPage: ", event);
  }

  onReady(event: any) {
    // console.log("ready: ", event);
  }

  onRender() {
    // console.log("render:");
  }

  onSubmissionLoad(event: any) {
    // console.log("SubmissionLoad:", event);
  }
}
