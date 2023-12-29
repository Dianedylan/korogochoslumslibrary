import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpClient) { }

  //to change link once updated on postman to enable add function.
  addMessage(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/menucombomeal', data);
  }

  

  updateMessage(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/menucombomeal/${id}`, data);
  }

}