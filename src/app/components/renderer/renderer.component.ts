import { Component, OnInit, inject } from '@angular/core';
import { FormioForm } from '@formio/angular';
import { SharedModule } from '../../shared.module';
import { GlobalService } from '../../service/global.service';

@Component({
  selector: 'app-renderer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.css'
})
export class RendererComponent implements OnInit {
  public formTemplates!: FormioForm[];// Array containing form templates retrieved from localstorage.
  public selectedTemplate!: FormioForm;
  public submitedTemplate!: {};
  public isTemplateSelected: boolean = false;
  public isDataSubmited: boolean = false;
  public service:GlobalService = inject(GlobalService);
  public rendererOption:any;

  //load data from local
  ngOnInit(): void {
    let existingData = localStorage.getItem('FormsJson');
    if (existingData !== null) {
      this.formTemplates = JSON.parse(existingData);
    }

    this.rendererOption = {
      sanitizeConfig: {
        allowedTags: ['sync-grid','cust-renderer'],
        addTags: ['sync-grid','cust-renderer']
      }
    }
  }

  /**
   * Renders the selected template based on the event value.
   * - If the value is -1, sets the isTemplateSelected flag to false.
   * - Otherwise, sets the isTemplateSelected flag to true, resets the isDataSubmited flag,
   *   and renders the selected template using Formio.createForm.
   * @param event The event object containing the target value.
  */
  renderTemplate(event: any) {
    if (event.target.value == -1) {
      this.isTemplateSelected = false;
    }
    else {
      this.isTemplateSelected = true;
      this.isDataSubmited = false;
      this.selectedTemplate = this.formTemplates[event.target.value];
      this.onChange();
    }
  }
  
  onSubmitForm(event:any) {
    console.log("Main submission: ",event);
    this.isDataSubmited = true;
    this.submitedTemplate = event.data;
  }

  onChange(): void {
    // Removing Syncfusion premium dialog
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
