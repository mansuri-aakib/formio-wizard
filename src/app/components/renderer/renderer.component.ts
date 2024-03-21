import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RendererDirective } from '../../directives/renderer.directive';
import { RendererService } from '../../service/global renderer.service';
import { MainRendererComponent } from '../main renderer/main-renderer.component';

@Component({
  selector: 'app-renderer',
  standalone: true,
  imports: [SharedModule, RendererDirective, MainRendererComponent],
  providers:[RendererService],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.css'
})
export class RendererComponent {
  public formTemplates: any;// Array containing form templates retrieved from localstorage.
  // public form:any;
  // public submitedTemplate!: {};
  // public isTemplateSelected: boolean = false;
  // public isDataSubmited: boolean = false;
  // public rendererOption:any;
  public formSubmission:any;
  // public rendererService:RendererService = inject(RendererService);
  public screenId:any;

  constructor(){
    // this.rendererService.loadFormSubmission.subscribe((submission:any)=>{
    //   this.formSubmission = {data:submission};
    // });
    
    // this.rendererService.submitForm.subscribe((event:any)=>{
    //   this.isDataSubmited = true;
    //   this.submitedTemplate = event.data;
    // })
  }


  ngOnInit(): void {
    let existingData = localStorage.getItem('FormsJson');
    if (existingData !== null) {
      this.formTemplates = JSON.parse(existingData);
    }

    // this.rendererOption = {
    //   sanitizeConfig: {
    //     allowedTags: ['sync-grid','cust-renderer'],
    //     addTags: ['sync-grid','cust-renderer']
    //   }
    // }
  }

  onSelectTemplate(event: any) {
    if (event.target.value == -1) {
      // this.isTemplateSelected = false;
    }
    else {
      // this.form= this.rendererService.onTemplateSelectEvent(event.target.value);
      this.screenId = event.target.value;
      // this.isTemplateSelected = true;
      // this.isDataSubmited = false;
      this.onChange();
    }
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
