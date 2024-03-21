import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'formio-main-renderer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main-renderer.component.html'
})
export class MainRendererComponent implements OnChanges {
  public form: any;
  public formSubmission: any;
  public rendererOption: any;
  @Input() screenId: any;
  @Output() onSubmitEvent:EventEmitter<any> = new EventEmitter();

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

  onFormLoad(event: any) {
    if (this.screenId !== undefined) {
      this.fetchSubmissionJsonFromLocal();
    }
  }

  OnSubmit(event: any) {
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
    // this.onSubmitEvent.emit(data);
  }

  private fetchSubmissionJsonFromLocal() {
    let existingData = localStorage.getItem('FormsSubmissionJson');
    if (existingData !== null) {
      let formsSubmissionJson = JSON.parse(existingData);
      this.formSubmission =  {data:formsSubmissionJson.filter((temp:any)=>temp.id==this.screenId)[0]};
    }
  }

  private fetchFormJsonFromLocal() {
    let existingData = localStorage.getItem('FormsJson');
    if (existingData !== null) {
      let formTemplates = JSON.parse(existingData);
      this.form = formTemplates.filter((temp: any) => temp.id == this.screenId)[0];
    }
  }
}
