import { Component, inject, OnInit, signal, computed, effect } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { TrackService } from './services/track.service';
import { Visit } from './models/visit.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DecimalPipe, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'currency-converter';

  // Convert state to signals
  exchangeRates = signal<Record<string, number>>({});
  amount = signal<number>(1);
  fromCurrency = signal<string>('USD');
  toCurrency = signal<string>('INR');
  visitorCount = signal<number>(0);
  
  // Theme state
  darkMode = signal<boolean>(false);

  // Loading and error states
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  isVisitorCountLoading = signal<boolean>(false);
  visitorCountError = signal<string | null>(null);

  // Add computed signal for convertedAmount
  convertedAmount = computed(() => {
    const rates = this.exchangeRates();
    const from = this.fromCurrency();
    const to = this.toCurrency();

    if (rates[from] && rates[to]) {
      const rate = rates[to] / rates[from];
      return this.amount() * rate;
    }
    return 0;
  });

  // Services
  meta = inject(Meta);
  trackService = inject(TrackService);
  exchangeRateService = inject(ExchangeRateService);

  constructor() {
    this.setupMetaTags();
    
    // Initialize theme from localStorage if available
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.darkMode.set(true);
    }
    
    // Set up theme change effect
    effect(() => {
      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  ngOnInit(): void {
    this.trackVisit();
    this.fetchExchangeRates();
  }

  toggleTheme(): void {
    this.darkMode.update(value => !value);
  }

  private setupMetaTags(): void {
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

  private trackVisit(): void {
    this.isVisitorCountLoading.set(true);
    this.visitorCountError.set(null);

    this.trackService.trackProjectVisit(this.title).subscribe({
      next: (response: Visit) => {
        this.visitorCount.set(response.uniqueVisitors);
        this.isVisitorCountLoading.set(false);
      },
      error: (err: Error) => {
        console.error('Failed to track visit:', err);
        this.visitorCountError.set('Failed to load visitor count');
        this.isVisitorCountLoading.set(false);
      },
    });
  }

  private fetchExchangeRates(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.exchangeRateService.getExchangeRates(this.fromCurrency()).subscribe({
      next: (response) => {
        this.exchangeRates.set(response.conversion_rates);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching exchange rates', error);
        this.error.set(
          'Failed to fetch exchange rates. Please try again later.'
        );
        this.isLoading.set(false);
      },
    });
  }

  // Methods to update signals
  updateAmount(newAmount: number): void {
    this.amount.set(newAmount);
  }

  updateFromCurrency(currency: string): void {
    this.fromCurrency.set(currency);
    this.fetchExchangeRates(); // Refetch with new base currency
  }

  updateToCurrency(currency: string): void {
    this.toCurrency.set(currency);
  }

  // Retry methods for error states
  retryFetchRates(): void {
    this.fetchExchangeRates();
  }

  retryVisitorCount(): void {
    this.trackVisit();
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

    let wholeNumber = Math.floor(Math.abs(amount));
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
