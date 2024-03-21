export class GlobalSubmissionService {
    private formsSubmissionJson:any;

    constructor(){
        let existingData = localStorage.getItem('FormsSubmissionJson');
        if (existingData !== null) {
          this.formsSubmissionJson = JSON.parse(existingData);
        }
    }

    get(screenId: any) {
        return this.formsSubmissionJson.filter((temp:any)=>temp.id==screenId);
    }
}