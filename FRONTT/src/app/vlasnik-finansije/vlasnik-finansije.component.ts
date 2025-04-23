import { Component } from '@angular/core';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-vlasnik-finansije',
  standalone: true,
  imports: [PieChartComponent, CalendarComponent],
  templateUrl: './vlasnik-finansije.component.html',
  styleUrl: './vlasnik-finansije.component.css'
})
export class VlasnikFinansijeComponent {

}
