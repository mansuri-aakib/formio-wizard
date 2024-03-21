import { Component, Injector } from '@angular/core';
import { SharedModule } from './shared.module';
import { registerSyncGridComponent } from './formio custom components/sync grid/register';
import { registerCustRendererComponent } from './formio custom components/custom renderer/register';
import { GlobalFetchingService } from './service/global fetching.service';
import { GlobalSubmissionService } from './service/global submission.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  providers:[GlobalFetchingService, GlobalSubmissionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formio-wizard';
  constructor(injector:Injector){
    registerSyncGridComponent(injector);
    registerCustRendererComponent(injector);
  }
}
