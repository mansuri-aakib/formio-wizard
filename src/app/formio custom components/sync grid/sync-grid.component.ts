import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { GridModule, RowSelectEventArgs, SelectionSettingsModel } from "@syncfusion/ej2-angular-grids";
import { HttpClient } from "@angular/common/http";

@Component({
    selector:'sync-grid',
    templateUrl:'./sync-grid.component.html',
    standalone:true,
    imports:[GridModule]
})
export class SyncGrid{
    /**
     * Optional property that defines the selection options for a component.
     * It specifies the mode and type of selection to be used.
     * Default mode is 'Row' and type is 'Single'.
    */
    public data:any;
    public selectionOptions?: SelectionSettingsModel = { mode: 'Row',  type: 'Single' };
    public client:HttpClient = inject(HttpClient);
    public url='https://dummyjson.com/products';
    @Output() valueChange = new EventEmitter<any>();
    @Input() value: any;

    // API request 
    constructor(){
        this.client.get(this.url).subscribe((res:any)=>{
            this.data=res.products
        });
    }

    rowSelected(args: RowSelectEventArgs): void {
        this.value = (args.data as any).title;
        this.valueChange.emit(this.value);
        // console.log(this.value);
        // alert(`selected data: ${JSON.stringify(args.data)}`);
    }
}
