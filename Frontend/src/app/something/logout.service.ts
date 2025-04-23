import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private apiUrl = `${environment.baseUrl}` + '/logout';

  constructor(private http: HttpClient) {
  }

  logout(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
