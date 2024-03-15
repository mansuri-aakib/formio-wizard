export class GlobalService {
    private formTemplates:any;

    constructor(){
        let existingData = localStorage.getItem('FormsJson');
        if (existingData !== null) {
          this.formTemplates = JSON.parse(existingData);
        }
    }

    get(screenId: any) {
        return this.formTemplates.filter((temp:any)=>temp.id==screenId);
    }
}