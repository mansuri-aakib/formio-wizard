import { Component, Injector } from '@angular/core';
import { SharedModule } from './shared.module';
import { registerSyncGridComponent } from './formio custom components/sync grid/register';
import { registerCustRendererComponent } from './formio custom components/custom renderer/register';
import { registerCustInputComponent } from './formio custom components/custom input/register';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  providers:[GlobalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formio-wizard';
  constructor(injector:Injector){
    registerSyncGridComponent(injector);
    registerCustRendererComponent(injector);
    registerCustInputComponent(injector);
  }
}
