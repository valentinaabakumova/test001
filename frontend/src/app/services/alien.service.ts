
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AlienService {

  private apiUrl = `${environment.api.baseUrl}/messages`;
  private apiKey = environment.apiKey;

  private secret = 'fGeJ35yZMFq8E3DdmWKGeJ6ZqKPuwxjB';

  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    const rawBody = JSON.stringify(data);
    const signature = CryptoJS.HmacSHA256(rawBody, this.secret).toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
      'x-signature': signature
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
