import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  //to change link once updated on postman to enable add function.
  addMessage(data: any){
    return this.http.post('http://localhost:3000/messages', data);
  }

  getMessages(): Observable<any>{
    return this.http.get('http://localhost:3000/messages');
  }
 

  updateMessage(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/messages/${id}`, data);
  }

}