import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hola';
  users: any[] = [];
  pru: any[] = [];
  constructor(protected userService: AppService) { }
  Highcharts = Highcharts;
  chartOptions: any;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        (data) => { // Success
          this.users = data['results'];
          for (const i of this.users) {
            this.pru.push(
              'edad', i.dob.age
            );
          }
          this.serie(this.pru);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  serie(llega) {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      series: [{
        data: llega
      }]
    };
  }
}
