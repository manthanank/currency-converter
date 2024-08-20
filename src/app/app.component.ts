import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DecimalPipe, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  exchangeRates: any = {};
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedAmount: number = 0;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates().subscribe(
      (response) => {
        this.exchangeRates = response.conversion_rates;
        this.convertCurrency();
      },
      (error) => {
        console.error('Error fetching exchange rates', error);
      }
    );
  }

  convertCurrency(): void {
    if (this.exchangeRates[this.fromCurrency] && this.exchangeRates[this.toCurrency]) {
      const rate = this.exchangeRates[this.toCurrency] / this.exchangeRates[this.fromCurrency];
      this.convertedAmount = this.amount * rate;
    }
  }
}