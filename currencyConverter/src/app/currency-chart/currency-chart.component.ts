import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, CategoryScale } from 'chart.js/auto';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {
  chart: any;
  chartData: any = {};
  date = new Date().toISOString().split('T')[0];
  baseCurrency = 'USD';
  exchangeRates: any[] = [];
  
  

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe((data: any) => {
      console.log(data);

      this.exchangeRates = Object.keys(data.rates).map((currency) => ({
        currency,
        rate: data.rates[currency]
      }));

      this.loadCurrencyData();
    });
  }

  loadCurrencyData(): void {
    this.currencyService.getCurrencyData(
      this.date,
      this.baseCurrency,
    ).subscribe((data: any) => {
      const labels = Object.keys(data.rates);
      console.log(data.rates);
      const values = Object.values(data.rates).map(rate => rate as number);
  
      
      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = values;
        this.chart.update(); 
      } else {
        this.createChart(labels, values);
      }
    });
  }
  createChart(labels: string[], values: number[]): void {
    Chart.register(LinearScale, CategoryScale);
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Currency Value',
            data: values,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Countries', 
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Rate', 
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: `Exchange Rate (${this.baseCurrency}) on ${this.date}`,
          },
        },
      },
    });
  }
  
  
  
  updateChart(): void {
    this.loadCurrencyData(); 
  }
}
