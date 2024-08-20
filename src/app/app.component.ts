import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';

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
  toCurrency: string = 'INR';
  convertedAmount: number = 0;

  meta = inject(Meta);
  exchangeRateService = inject(ExchangeRateService);

  constructor() {
    this.meta.addTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
    this.meta.addTag({ name: 'description', content: 'Currency Converter' });
    this.meta.addTag({ name: 'author', content: 'Currency Converter' });
    this.meta.addTag({ name: 'keywords', content: 'angular' });
    this.meta.addTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({ property: 'og:title', content: 'Currency Converter' });
    this.meta.addTag({
      property: 'og:description',
      content: 'A simple currency converter built using Angular',
    });
    this.meta.addTag({
      property: 'og:image',
      content: 'https://currency-converter-manthanank.vercel.app/image.jpg',
    });
    this.meta.addTag({
      property: 'og:url',
      content: 'https://currency-converter-manthanank.vercel.app/',
    });
    this.meta.addTag({
      rel: 'icon',
      type: 'image/x-icon',
      href: 'favicon.ico',
    });
    this.meta.addTag({
      rel: 'canonical',
      href: 'https://currency-converter-manthanank.vercel.app/',
    });
  }

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
    if (
      this.exchangeRates[this.fromCurrency] &&
      this.exchangeRates[this.toCurrency]
    ) {
      const rate =
        this.exchangeRates[this.toCurrency] /
        this.exchangeRates[this.fromCurrency];
      this.convertedAmount = this.amount * rate;
    }
  }
}
