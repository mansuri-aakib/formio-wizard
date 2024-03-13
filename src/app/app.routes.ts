import { Routes } from '@angular/router';
import { BuilderComponent } from './components/builder/builder.component';
import { RendererComponent } from './components/renderer/renderer.component';

export const routes: Routes = [
    {path:'',redirectTo:'Builder',pathMatch:'full'},
    {path:'Builder', component:BuilderComponent},
    {path:'Renderer', component:RendererComponent},
    {path:'**',redirectTo:'Builder',pathMatch:'full'}
];
