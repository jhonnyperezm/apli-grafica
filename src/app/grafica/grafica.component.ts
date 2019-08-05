import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  title: string = "Grafica Principal";
  users: any = [];

  Highcharts: typeof Highcharts = Highcharts;
  graficaPrueba: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    series: [
      {
        data: [],
        type: 'column'
      }
    ]
  };

  constructor(protected userService: AppService,
    public router: Router) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        (data) => { // Success
          this.users = data['results'];
          const datosGrafica = this.users.map(x => x.dob.age);

          //Highcharts
          this.graficaPrueba.series[0]['data'] = datosGrafica;
          Highcharts.chart('MediosdPPrincipal', this.graficaPrueba);
        },
        (err) => {
          console.error(err);
        }
      );
  }

}
