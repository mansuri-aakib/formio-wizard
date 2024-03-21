export class GlobalSubmissionService {
    private formsSubmissionJson:any;

    constructor(){}

    private fetchFromLocal(){
        let existingData = localStorage.getItem('FormsSubmissionJson');
        if (existingData !== null) {
          this.formsSubmissionJson = JSON.parse(existingData);
        }
    }

    get(screenId: any) { 
        this.fetchFromLocal();
        return this.formsSubmissionJson.filter((temp:any)=>temp.id==screenId);
    }
}