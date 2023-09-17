import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<any> {
    const apiUrl = 'https://openexchangerates.org/api/latest.json?app_id=83c2404380d641b9b6fc4230ecbf8aca';
    return this.http.get(apiUrl);
  }

  getCurrencyData(date: string,baseCurrency:string): Observable<any> {
    const apiUrl2 = `https://openexchangerates.org/api/historical/${date}.json?app_id=83c2404380d641b9b6fc4230ecbf8aca&base=${baseCurrency}`;
    console.log("mm" + apiUrl2);
    return this.http.get(apiUrl2);
  }
}
