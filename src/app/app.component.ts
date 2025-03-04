import { Component, inject, OnInit } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DecimalPipe, KeyValuePipe],
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

  getAmountInWords(amount: number): string {
    if (!amount || isNaN(amount)) return '';

    const units = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];
    const teens = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 0) return 'Negative ' + convertLessThanThousand(-n);
      if (n < 10) return units[n];
      if (n < 20) return teens[n - 10];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 ? '-' + units[n % 10] : '');
      return (
        units[Math.floor(n / 100)] +
        ' Hundred' +
        (n % 100 ? ' and ' + convertLessThanThousand(n % 100) : '')
      );
    };

    const convertDecimals = (n: number): string => {
      if (n < 10) return units[n];
      if (n < 20) return teens[n - 10];
      return tens[Math.floor(n / 10)] + (n % 10 ? '-' + units[n % 10] : '');
    };

    let wholeNumber = Math.floor(Math.abs(amount)); // Changed from const to let
    const decimal = Math.round((Math.abs(amount) - wholeNumber) * 100);
    let words = amount < 0 ? 'Negative ' : '';

    if (wholeNumber === 0 && decimal === 0) return 'Zero';
    if (wholeNumber >= 1e12) return 'Number too large';

    // Convert the whole number part
    if (wholeNumber > 0) {
      if (wholeNumber >= 1e9) {
        words +=
          convertLessThanThousand(Math.floor(wholeNumber / 1e9)) + ' Billion ';
        wholeNumber %= 1e9;
      }
      if (wholeNumber >= 1e6) {
        words +=
          convertLessThanThousand(Math.floor(wholeNumber / 1e6)) + ' Million ';
        wholeNumber %= 1e6;
      }
      if (wholeNumber >= 1000) {
        words +=
          convertLessThanThousand(Math.floor(wholeNumber / 1000)) +
          ' Thousand ';
        wholeNumber %= 1000;
      }
      words += convertLessThanThousand(wholeNumber);
    }

    // Add decimal part if exists
    if (decimal > 0) {
      words += ' point ' + convertDecimals(decimal);
    }

    return words.trim();
  }
}
