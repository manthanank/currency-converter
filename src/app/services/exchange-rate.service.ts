import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_KEY = environment.API_KEY;

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  http = inject(HttpClient);
  constructor() {}

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
    );
  }
}
