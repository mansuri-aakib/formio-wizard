import { NgModule } from "@angular/core";
import { GridModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
    imports:[
        GridModule
    ],
    exports:[
        GridModule
    ],
})
export class SyncGridModule{
    constructor(){
        console.log('Grid Module');   
    }
}