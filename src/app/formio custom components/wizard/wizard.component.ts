import { Component, ViewChild, inject } from "@angular/core";
import { FormioForm, FormioModule } from "@formio/angular";

@Component({
    selector:'wizard-comp',
    templateUrl:'./wizard.component.html',
    standalone:true,
    imports:[FormioModule]
})
export class WizardComp{
    private screeJson:any;
    @ViewChild('renderer') renderer?:any;

    wizardForm: FormioForm = {
        display: "wizard",
        type:"form",
        components: [
            {
                type: "panel",
                title: `Page 0`,
                components: [
                ],
                input: false,
                key: "page1",
                tableView: false,
                label: "Panel"
            },
            {
                type: "panel",
                title: `Page 1`,
                components: [
                ],
                input: false,
                key: "page1",
                tableView: false,
                label: "Panel"
            },
            {
                type: "panel",
                title: `Page 3`,
                components: [],
                input: false,
                key: "page1",
                tableView: false,
                label: "Panel"
            }
        ],
    }

    // API request 
    constructor(){ 
        this.getNextScreen();
    }

    ngAfterViewInit(){
        this.renderer.nextPage.subscribe(()=>{
            this.getNextScreen();
        })

        this.renderer.prevPage.subscribe(()=>{
            this.getNextScreen();
        })
    }

    
    getNextScreen(){
    }

    renderNextScreen(){
        // this.renderer.formio.currentPanel.components = [ panel2 ];
        // console.log(this.renderer.formio.currentPanel);
        // this.renderer.form.renderer
    }
}
