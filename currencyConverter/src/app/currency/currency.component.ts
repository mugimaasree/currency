import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  amountToConvert: number = 1;
  selectedFromCurrency: string = 'USD';
  selectedToCurrency: string = 'INR';
  exchangeRates: any[] = [];
  convertedAmount: number = 0;
  exchangeRateText: string = 'Getting exchange rate...'; 
  countryToFlagUrlMapping: any = {
    "AED": "https://flagsapi.com/AE/flat/64.png",
    "AFN": "https://flagsapi.com/AF/flat/64.png",
    "XCD": "https://flagsapi.com/AG/flat/64.png",
    "ALL" : "https://flagsapi.com/AL/flat/64.png",
    "AMD" : "https://flagsapi.com/AM/flat/64.png",
    "ANG" : "https://flagsapi.com/AN/flat/64.png",
    "AWG" : "https://flagsapi.com/AW/flat/64.png",
    "BTC" : "https://flagsapi.com/BT/flat/64.png",
    "BTN" : "https://flagsapi.com/BT/flat/64.png",
    "BYN" : "https://flagsapi.com/BY/flat/64.png",
    "AOA" : "https://flagsapi.com/AO/flat/64.png",
    "AQD" : "https://flagsapi.com/AQ/flat/64.png",
    "ARS" : "https://flagsapi.com/AR/flat/64.png",
    "AUD" : "https://flagsapi.com/AU/flat/64.png",
    "AZN" : "https://flagsapi.com/AZ/flat/64.png",
    "BAM" : "https://flagsapi.com/BA/flat/64.png",
    "BBD" : "https://flagsapi.com/BB/flat/64.png",
    "BDT" : "https://flagsapi.com/BD/flat/64.png",
    "XOF" : "https://flagsapi.com/BE/flat/64.png",
    "BGN" : "https://flagsapi.com/BG/flat/64.png",
    "BHD" : "https://flagsapi.com/BH/flat/64.png",
    "BIF" : "https://flagsapi.com/BI/flat/64.png",
    "BMD" : "https://flagsapi.com/BM/flat/64.png",
    "BND" : "https://flagsapi.com/BN/flat/64.png",
    "BOB" : "https://flagsapi.com/BO/flat/64.png",
    "BRL" : "https://flagsapi.com/BR/flat/64.png",
    "BSD" : "https://flagsapi.com/BS/flat/64.png",
    "NOK" : "https://flagsapi.com/BV/flat/64.png",
    "BWP" : "https://flagsapi.com/BW/flat/64.png",
    "BYR" : "https://flagsapi.com/BY/flat/64.png",
    "BZD" : "https://flagsapi.com/BZ/flat/64.png",
    "CAD" : "https://flagsapi.com/CA/flat/64.png",
    "CDF" : "https://flagsapi.com/CD/flat/64.png",
    "CLF" :  "https://flagsapi.com/CL/flat/64.png",
    "XAF" : "https://flagsapi.com/CF/flat/64.png",
    "CHF" : "https://flagsapi.com/CH/flat/64.png",
    "CLP" : "https://flagsapi.com/CL/flat/64.png",
    "CNY" : "https://flagsapi.com/CN/flat/64.png",
    "COP" : "https://flagsapi.com/CO/flat/64.png",
    "CRC" : "https://flagsapi.com/CR/flat/64.png",
    "CUP" : "https://flagsapi.com/CU/flat/64.png",
    "CVE" : "https://flagsapi.com/CV/flat/64.png",
    "CYP" : "https://flagsapi.com/CY/flat/64.png",
    "CZK" : "https://flagsapi.com/CZ/flat/64.png",
    "DJF" : "https://flagsapi.com/DJ/flat/64.png",
    "DKK" : "https://flagsapi.com/DK/flat/64.png",
    "DOP" : "https://flagsapi.com/DO/flat/64.png",
    "DZD" : "https://flagsapi.com/DZ/flat/64.png",
    "ECS" : "https://flagsapi.com/EC/flat/64.png",
    "EEK" : "https://flagsapi.com/EE/flat/64.png",
    "EGP" : "https://flagsapi.com/EG/flat/64.png",
    "ETB" : "https://flagsapi.com/ET/flat/64.png",
    "EUR" : "https://flagsapi.com/FR/flat/64.png",
    "FJD" : "https://flagsapi.com/FJ/flat/64.png",
    "FKP" : "https://flagsapi.com/FK/flat/64.png",
    "GBP" : "https://flagsapi.com/GB/flat/64.png",
    "GEL" : "https://flagsapi.com/GE/flat/64.png",
    "GGP" : "https://flagsapi.com/GG/flat/64.png",
    "GHS" : "https://flagsapi.com/GH/flat/64.png",
    "GIP" : "https://flagsapi.com/GI/flat/64.png",
    "GMD" : "https://flagsapi.com/GM/flat/64.png",
    "GNF" : "GNhttps://flagsapi.com/GN/flat/64.png",
    "GTQ" : "GThttps://flagsapi.com/GT/flat/64.png",
    "GYD" : "GYhttps://flagsapi.com/GY/flat/64.png",
    "HKD" : "HKhttps://flagsapi.com/HK/flat/64.png",
    "HNL" : "HNhttps://flagsapi.com/HN/flat/64.png",
    "HRK" : "HRhttps://flagsapi.com/HR/flat/64.png",
    "HTG" : "HThttps://flagsapi.com/HT/flat/64.png",
    "HUF" : "HUhttps://flagsapi.com/HU/flat/64.png",
    "IDR" : "https://flagsapi.com/ID/flat/64.png",
    "ILS" : "https://flagsapi.com/IL/flat/64.png",
    "INR" : "https://flagsapi.com/IN/flat/64.png",
    "IQD" : "https://flagsapi.com/IQ/flat/64.png",
    "IRR" : "https://flagsapi.com/IR/flat/64.png",
    "ISK" : "https://flagsapi.com/IS/flat/64.png",
    "JMD" : "https://flagsapi.com/JM/flat/64.png",
    "JOD" : "https://flagsapi.com/JO/flat/64.png",
    "JPY" : "https://flagsapi.com/JP/flat/64.png",
    "KES" : "https://flagsapi.com/KE/flat/64.png",
    "KGS" : "https://flagsapi.com/KG/flat/64.png",
    "KHR" : "https://flagsapi.com/KH/flat/64.png",
    "KMF" : "https://flagsapi.com/KM/flat/64.png",
    "KPW" : "https://flagsapi.com/KP/flat/64.png",
    "KRW" : "https://flagsapi.com/KR/flat/64.png",
    "KWD" : "https://flagsapi.com/KW/flat/64.png",
    "KYD" : "https://flagsapi.com/KY/flat/64.png",
    "KZT" : "https://flagsapi.com/KZ/flat/64.png",
    "LAK" : "https://flagsapi.com/LA/flat/64.png",
    "LBP" : "https://flagsapi.com/LB/flat/64.png",
    "LKR" : "https://flagsapi.com/LK/flat/64.png",
    "LRD" : "https://flagsapi.com/LR/flat/64.png",
    "LSL" : "https://flagsapi.com/LS/flat/64.png",
    "LTL" : "https://flagsapi.com/LT/flat/64.png",
    "LVL" : "https://flagsapi.com/LV/flat/64.png",
    "LYD" : "https://flagsapi.com/LY/flat/64.png",
    "MAD" : "https://flagsapi.com/MA/flat/64.png",
    "MDL" : "https://flagsapi.com/MD/flat/64.png",
    "MGA" : "https://flagsapi.com/MG/flat/64.png",
    "MKD" : "https://flagsapi.com/MK/flat/64.png",
    "MMK" : "https://flagsapi.com/MM/flat/64.png",
    "MNT" : "https://flagsapi.com/MN/flat/64.png",
    "MOP" : "https://flagsapi.com/MO/flat/64.png",
    "MRO" : "https://flagsapi.com/MR/flat/64.png",
    "MTL" : "https://flagsapi.com/MT/flat/64.png",
    "MUR" : "https://flagsapi.com/MU/flat/64.png",
    "MVR" : "https://flagsapi.com/MV/flat/64.png",
    "MWK" : "https://flagsapi.com/MW/flat/64.png",
    "MXN" : "https://flagsapi.com/MX/flat/64.png",
    "MYR" : "https://flagsapi.com/MY/flat/64.png",
    "MZN" : "https://flagsapi.com/MZ/flat/64.png",
    "NAD" : "https://flagsapi.com/NA/flat/64.png",
    "XPF" : "https://flagsapi.com/NC/flat/64.png",
    "NGN" : "https://flagsapi.com/NG/flat/64.png",
    "NIO" : "https://flagsapi.com/NI/flat/64.png",
    "NPR" : "https://flagsapi.com/NP/flat/64.png",
    "NZD" : "https://flagsapi.com/NZ/flat/64.png",
    "OMR" : "https://flagsapi.com/OM/flat/64.png",
    "PAB" : "https://flagsapi.com/PA/flat/64.png",
    "PEN" : "https://flagsapi.com/PE/flat/64.png",
    "PGK" : "https://flagsapi.com/PG/flat/64.png",
    "PHP" : "https://flagsapi.com/PH/flat/64.png",
    "PKR" : "https://flagsapi.com/PK/flat/64.png",
    "PLN" : "https://flagsapi.com/PL/flat/64.png",
    "PYG" : "https://flagsapi.com/PY/flat/64.png",
    "QAR" : "https://flagsapi.com/QA/flat/64.png",
    "RON" : "https://flagsapi.com/RO/flat/64.png",
    "RSD" : "https://flagsapi.com/RS/flat/64.png",
    "RUB" : "https://flagsapi.com/RU/flat/64.png",
    "RWF" : "https://flagsapi.com/RW/flat/64.png",
    "SAR" : "https://flagsapi.com/SA/flat/64.png",
    "SBD" : "https://flagsapi.com/SB/flat/64.png",
    "SCR" : "https://flagsapi.com/SC/flat/64.png",
    "SDG" : "https://flagsapi.com/SD/flat/64.png",
    "SEK" : "https://flagsapi.com/SE/flat/64.png",
    "SGD" : "https://flagsapi.com/SG/flat/64.png",
    "SKK" : "https://flagsapi.com/SK/flat/64.png",
    "SLL" : "https://flagsapi.com/SL/flat/64.png",
    "SOS" : "https://flagsapi.com/SO/flat/64.png",
    "SRD" : "https://flagsapi.com/SR/flat/64.png",
    "STD" : "https://flagsapi.com/ST/flat/64.png",
    "SVC" : "https://flagsapi.com/SV/flat/64.png",
    "SYP" : "https://flagsapi.com/SY/flat/64.png",
    "SZL" : "https://flagsapi.com/SZ/flat/64.png",
    "THB" : "https://flagsapi.com/TH/flat/64.png",
    "TJS" : "https://flagsapi.com/TJ/flat/64.png",
    "TMT" : "https://flagsapi.com/TM/flat/64.png",
    "TND" : "https://flagsapi.com/TN/flat/64.png",
    "TOP" : "https://flagsapi.com/TO/flat/64.png",
    "TRY" : "https://flagsapi.com/TR/flat/64.png",
    "TTD" : "https://flagsapi.com/TT/flat/64.png",
    "TWD" : "https://flagsapi.com/TW/flat/64.png",
    "TZS" : "https://flagsapi.com/TZ/flat/64.png",
    "UAH" : "https://flagsapi.com/UA/flat/64.png",
    "UGX" : "https://flagsapi.com/UG/flat/64.png",
    "USD" : "https://flagsapi.com/US/flat/64.png",
    "UYU" : "https://flagsapi.com/UY/flat/64.png",
    "UZS" : "https://flagsapi.com/UZ/flat/64.png",
    "VEF" : "https://flagsapi.com/VE/flat/64.png",
    "VND" : "https://flagsapi.com/VN/flat/64.png",
    "VUV" : "https://flagsapi.com/VU/flat/64.png",
    "YER" : "https://flagsapi.com/YE/flat/64.png",
    "ZAR" : "https://flagsapi.com/ZA/flat/64.png",
    "ZMK" : "https://flagsapi.com/ZM/flat/64.png",
    "ZWD" : "https://flagsapi.com/ZW/flat/64.png"
   
  }

  
  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getExchangeRates().subscribe((data: any) => {

      this.exchangeRates = Object.keys(data.rates).map((currency) => ({
        currency,
        rate: data.rates[currency]
      }));

      this.selectedFromCurrency = 'USD';
      this.selectedToCurrency = 'INR';
      this.convertCurrency();
    });
  }

  convertCurrency() {
    if (this.selectedFromCurrency && this.selectedToCurrency && this.amountToConvert >= 0) {
      const fromRate = this.exchangeRates.find(rate => rate.currency === this.selectedFromCurrency);
      const toRate = this.exchangeRates.find(rate => rate.currency === this.selectedToCurrency);

      if (fromRate && toRate) {
        const conversionRate = toRate.rate / fromRate.rate;
        this.convertedAmount = this.amountToConvert * conversionRate;
        this.exchangeRateText = `${this.amountToConvert} ${this.selectedFromCurrency} = ${this.convertedAmount} ${this.selectedToCurrency}`;
      } else {
        console.error('One or both selected currencies not found in exchange rates.');
      }
    } else {
      console.error('Invalid inputs. Please select "from" and "to" currencies and enter a valid amount.');
    }
  }
}
