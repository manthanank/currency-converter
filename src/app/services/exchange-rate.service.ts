import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = environment.backendUrl;
  http = inject(HttpClient);
  
  constructor() {}

  getExchangeRates(baseCurrency: string = 'USD'): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/exchange-rates?base=${baseCurrency}`
    );
  }
}
