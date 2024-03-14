import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Subject } from "rxjs";

export class GlobalService {
    private http: HttpClient = inject(HttpClient);
    public emitter = new Subject();

    get(url: string) {
        this.http.get(url).subscribe((res: any) => {
            this.emitter.next(JSON.parse(res.Body.screenJson));
        });
    }
}