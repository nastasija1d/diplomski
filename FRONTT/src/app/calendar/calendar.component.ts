import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentYear!: number;
  currentMonth!: number; // 0 = Jan, 11 = Dec
  weeks: (number | null)[][] = [];

  todayYear = new Date().getFullYear();
  todayMonth = new Date().getMonth();

  datumOD: Date | null = null;
  datumDO: Date | null = null;

  @Output() datumiChange = new EventEmitter<{ datumOD: string | null, datumDO: string | null }>();


  weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  ngOnInit() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    // pre-select today as datumOD
    this.datumOD = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.datumDO = null;
    this.emitDatumi();
    this.generateCalendar();
  }

  // rebuild the matrix of weeks × days whenever month/year changes
  private generateCalendar() {
    this.weeks = [];
    // 1) find weekday index of the 1st of month, adjusted so Monday=0
    const firstOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    // JS: Sunday=0 → we want Monday=0, Sunday=6
    const shift = (firstOfMonth.getDay() + 6) % 7;

    // 2) how many days in this month
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // 3) fill weeks
    let week: (number | null)[] = new Array(7).fill(null);
    let dayCounter = 1;

    // fill first week
    for (let i = shift; i < 7; i++) {
      week[i] = dayCounter++;
    }
    this.weeks.push(week);

    // fill remaining weeks
    while (dayCounter <= daysInMonth) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter++;
      }
      this.weeks.push(week);
    }
  }


  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentYear === this.todayYear && this.currentMonth === this.todayMonth) {
      return; 
    }
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  // user clicks a day number
  selectDay(day: number | null) {
    if (day === null) return;
    const clicked = new Date(this.currentYear, this.currentMonth, day);

    // if no start yet, or both already set → start fresh
    if (!this.datumOD || (this.datumOD && this.datumDO)) {
      this.datumOD = clicked;
      this.datumDO = null;
      return;
    }

    // only start is set → set end
    if (this.datumOD && !this.datumDO) {
      if (clicked < this.datumOD) {
        this.datumDO = this.datumOD;
        this.datumOD = clicked;
      } else {
        this.datumDO = clicked;
      }
    }
    this.emitDatumi();
  }

  // helper to style cells in the selected range
  isInRange(day: number | null): boolean {
    if (!this.datumOD || !this.datumDO || day === null) return false;
    const d = new Date(this.currentYear, this.currentMonth, day);
    return d >= this.datumOD! && d <= this.datumDO!;
  }

  isStart(day: number | null): boolean {
    if (!this.datumOD || day === null) return false;
    return this.datumOD.getDate()    === day
        && this.datumOD.getMonth()   === this.currentMonth
        && this.datumOD.getFullYear()=== this.currentYear;
  }
  
  // only mark end if day, month AND year all match
  isEnd(day: number | null): boolean {
    if (!this.datumDO || day === null) return false;
    return this.datumDO.getDate()    === day
        && this.datumDO.getMonth()   === this.currentMonth
        && this.datumDO.getFullYear()=== this.currentYear;
  }

  private emitDatumi() {
    const datumODstr = this.datumOD ? this.toYYYYMMDD(this.datumOD) : null;
    const datumDOstr = this.datumDO ? this.toYYYYMMDD(this.datumDO) : datumODstr; // <<< OVDE JE BITNO
  
    this.datumiChange.emit({
      datumOD: datumODstr,
      datumDO: datumDOstr
    });
  }
  
  private toYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
