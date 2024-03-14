import { Component, OnInit, inject } from '@angular/core';
import { Formio, FormioForm, FormioUtils } from '@formio/angular';
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
  public selectedTemplate!: any;
  public submitedTemplate!: {};
  public isTemplateSelected: boolean = false;
  public isDataSubmited: boolean = false;
  public service:GlobalService = inject(GlobalService);

  //load data from local
  ngOnInit(): void {
    let existingData = localStorage.getItem('FormsJson');
    if (existingData !== null) {
      this.formTemplates = JSON.parse(existingData);
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
      this.createForm();
      this.onChange();
    }
  }
  
  createForm(){
    Formio.createForm(
      document.getElementById('formio'),
      this.selectedTemplate,
      {
        sanitize: true,
        sanitizeConfig: {
          allowedTags: ['sync-grid','cust-renderer'],
          addTags: ['sync-grid','cust-renderer']
        }
      }
    ).then((form) => {
      form.on('submit',this.onSubmitForm);

      form.on('nextPage',()=>{
        FormioUtils.eachComponent((form as any).component.components,(comp:any)=>{
          if(comp.type === 'CustRenderer'){
            this.service.get(comp.ApiUrl);
          }
        })
      });

      form.on('prevPage',()=>{
        FormioUtils.eachComponent((form as any).component.components,(comp:any)=>{
          if(comp.type === 'CustRenderer'){
            this.service.get(comp.ApiUrl);
          }
        })
      });

      form.on('change',()=>{
        FormioUtils.eachComponent((form as any).component.components,(comp:any)=>{
          if(comp.type === 'CustRenderer'){
            this.service.get(comp.ApiUrl);
          }
        })
      })
      
      FormioUtils.eachComponent((form as any).component.components,(comp:any)=>{
        if(comp.type === 'CustRenderer'){
          this.service.get(comp.ApiUrl);
        }
      })
    });
  }

  onSubmitForm(formJson: any) {
    this.isDataSubmited = true;
    this.submitedTemplate = formJson.data;
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
