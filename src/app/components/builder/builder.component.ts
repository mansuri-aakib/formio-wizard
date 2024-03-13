import { AfterViewChecked, Component, EventEmitter, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormioForm } from '@formio/angular';
import builder_option from './builder_option';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent implements AfterViewChecked{
  public formTemplates!: FormioForm[];
  public form! : FormioForm;
  public formMode : any = 'form';
  public builderOption!: {};
  public rebuiltEmitter:EventEmitter<any> = new EventEmitter();
  @ViewChild('builder') builderElem:any;

  /**
   * Initializes the form object with an empty title and an empty array of components.
   * Initializes the options for the form with sanitization configurations and builder settings.
  */
  constructor() {
    this.loadFromLocal();
    this.builderOption = builder_option;
    this.setForm();
  }

  changeMode(event:any){
    this.formMode = event.target.value;
    this.setForm();
  }
  
  renderTemplate(event: any) {
    if (event.target.value == -1) {
      this.setForm();
    }
    else {
      this.formMode = this.formTemplates[event.target.value].display;
      this.setForm(this.formTemplates[event.target.value]);
    }
  }

  setForm(form:any={title: '',display: this.formMode,components: []}){
    this.form = form;
  }

  loadFromLocal(){
    let existingData = localStorage.getItem('FormsJson');
    if (existingData !== null) {
      this.formTemplates = JSON.parse(existingData);
    }
  }

  ngAfterViewChecked(): void {
    let elem:HTMLElement | null = document.querySelector('.breadcrumb');
    if(elem !== null)
      (elem as any).style.backgroundColor = 'black';
  }

  onChange(event: any): void {
    //Removing Syncfusion premium dialogs
    if (event.type === 'updateComponent' && event.component.type === "syncgrid") {
      document
        .querySelectorAll(
          'div[style*="background-color: rgba(0, 0, 0, 0.5)"]'
        )
        .forEach((e) => {
          e.remove();
        });

      document
        .querySelectorAll(
          'div[style*="z-index: 999999999"]'
        )
        .forEach((e) => {
          e.remove();
        });
    }
  }

  /**
   * Function to handle form submission.
   * - Updates the form object with the current screen title and components.
   * - Checks if form data exists in localStorage.
   *   - If not, creates a new array with the current form and stores it in localStorage.
   *   - If yes, updates the existing form data with the current form or adds a new form if it doesn't already exist.
   * - Clears the screen title input and displays an alert confirming the submission.
  */
  onSaveForm() {
    let existingData = localStorage.getItem('FormsJson');

    if (existingData === null) {
      localStorage.setItem('FormsJson', JSON.stringify([this.form]));
    }

    else {
      let formsJson = JSON.parse(existingData);
      let alradyExistForm: boolean = false;
      let alradyExistFormIndex: number = -1;

      formsJson.forEach((form: FormioForm, index: number) => {
        if (form.title === this.form.title) {
          alradyExistForm = true;
          alradyExistFormIndex = index;
        }
      });

      if (alradyExistForm) {
        formsJson[alradyExistFormIndex] = this.form;
      }
      else {
        formsJson.push(this.form);
      }
      localStorage.setItem('FormsJson', JSON.stringify(formsJson));
    }
    this.setForm();
    this.loadFromLocal();
  }
}
