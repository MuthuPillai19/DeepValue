import { Component, OnInit } from '@angular/core';
import { ParamSelectorService } from '../../paramselector/paramselector.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  id = 'AngularChart1';  
  width = 600;  
  height = 400;  
  type = 'scatter';  
  dataFormat = 'json';  
  dataSource;  
  dataset = [
                {
                    "seriesname": "Deep",
                    "showregressionline": "1",
                    "data": [
                        {
                            "x": "0",
                            "y": "7640"
                        },
                        {
                            "x": "9000000",
                            "y": "7640"
                        }
                    ]
                },
                {
                    "seriesname": "Value",
                    "showregressionline": "1",
                    "data": [
                        {
                            "x": "0",
                            "y": "5240"
                        },
                        {
                            "x": "8000000",
                            "y": "5240"
                        }
                    ]
                }
            ];
    
  
  ngOnInit() {
      this.dataSource.dataset = this.dataset;
      this.paramSelectorService.changeJSON.subscribe(dataset => {
        this.dataSource.dataset = dataset;
      });
  }

  constructor(private paramSelectorService : ParamSelectorService){
  
    this.dataSource = {
        "chart": {
            "caption": "Stock and Price details",
            "subCaption": "Showing the details of stock and price info.",
            "xAxisName": "Stock size",
            "yAxisName": "Price (In Rupees)",
            "xAxisMinValue": "0",
            "xAxisMaxValue": "95",
            "yNumberPrefix": "Rs. ",
            "xNumberSuffix": " s",
            "showYAxisLine": "1",
            "theme": "fint"
        },
        "categories": [
            {
                "verticalLineDashed": "1",
                "verticalLineDashLen": "1",
                "verticalLineDashGap": "1",
                "verticalLineThickness": "1",
                "verticalLineColor": "#000000",
                "category": [
                    {
                        "x": "0",
                        "label": "0 s",
                        "showverticalline": "0"
                    },
                    {
                        "x": "2000000",
                        "label": "2M s",
                        "showverticalline": "1"
                    },
                    {
                        "x": "4000000",
                        "label": "4M s",
                        "showverticalline": "1"
                    },
                    {
                        "x": "6000000",
                        "label": "6M s",
                        "showverticalline": "1"
                    },
                    {
                        "x": "8000000",
                        "label": "8M s",
                        "showverticalline": "1"
                    },
                    {
                        "x": "10000000",
                        "label": "10M s",
                        "showverticalline": "1"
                    }
                ]
            }
        ],
        "dataset": [],
        "vtrendlines": [
            {
                "line": [
                    {
                        "startvalue": "0",
                        "endvalue": "2000000",
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#adebff",
                        "alpha": "25"
                    },
                    {
                        "startvalue": "2000000",
                        "endvalue": "4000000",
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#adebff",
                        "alpha": "15"
                    },
                    {
                        "startvalue": "4000000",
                        "endvalue": "6000000",
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#f2a485",
                        "alpha": "15"
                    },
                    {
                        "startvalue": "6000000",
                        "endvalue": "8000000",
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#f2a485",
                        "alpha": "25"
                    },
                    {
                        "startvalue": "8000000",
                        "endvalue": "10000000",
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#adebff",
                        "alpha": "25"
                    },
                ]
            }
        ]
    }
  }
}
