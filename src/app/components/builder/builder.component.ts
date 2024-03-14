import { Component } from '@angular/core';
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
export class BuilderComponent{
  public formTemplates!: FormioForm[];
  public selectedFormIndex:number;
  public form! : FormioForm;
  public formMode : any = 'form';
  public builderOption!: {};

  /**
   * Initializes the form object with an empty title and an empty array of components.
   * Initializes the options for the form with sanitization configurations and builder settings.
  */
  constructor() {
    this.loadFromLocal();
    this.builderOption = builder_option;
    this.selectedFormIndex = -1;
    this.setForm();
  }

  changeMode(event:any){
    this.formMode = event.target.value;
    this.selectedFormIndex = -1;
    this.setForm();
  }
  
  renderTemplate(event: any) {
    if (event.target.value == -1) {
      this.selectedFormIndex = -1;
      this.setForm();
    }
    else {
      this.selectedFormIndex = event.target.value;
      this.formMode = this.formTemplates[this.selectedFormIndex].display;
      this.setForm(this.formTemplates[this.selectedFormIndex]);
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
    this.selectedFormIndex = -1;
    this.setForm();
    this.loadFromLocal();
  }
}
