import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonationService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  addDonationDetails(data: any){
    return this.http.post('http://localhost:3000/donors', data);
  }
  
  getDonorList(): Observable<any>{
    return this.http.get('http://localhost:3000/donors');
  }

  addCardDetails(data: any){
    return this.http.post('http://localhost:3000/donorcard', data);
  }
}
