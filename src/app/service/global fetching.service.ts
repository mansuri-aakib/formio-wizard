export class GlobalFetchingService {
    private formTemplates:any;

    constructor(){}

    private fetchFromLocal(){
        let existingData = localStorage.getItem('FormsJson');
        if (existingData !== null) {
          this.formTemplates = JSON.parse(existingData);
        }
    }

    get(screenId: any) {
        this.fetchFromLocal();
        return this.formTemplates.filter((temp:any)=>temp.id==screenId);
    }
}