import { Component, inject, OnInit } from '@angular/core';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CalendarComponent } from "../calendar/calendar.component";
import { Proizvodjac } from '../1models/proizvodjac';
import { CommonModule } from '@angular/common';
import { VlasnikService } from '../1services/vlasnik.service';

@Component({
  selector: 'app-vlasnik-finansije',
  standalone: true,
  imports: [PieChartComponent, CalendarComponent, CommonModule],
  templateUrl: './vlasnik-finansije.component.html',
  styleUrl: './vlasnik-finansije.component.css'
})
export class VlasnikFinansijeComponent implements OnInit {
  ngOnInit(): void {
    // this.updateData();
  }

  selectedDatumOD: string | null = null;
  selectedDatumDO: string | null = null;
  servis = inject(VlasnikService);

  onDatumiChanged(event: { datumOD: string | null, datumDO: string | null }) {
    this.selectedDatumOD = event.datumOD;
    this.selectedDatumDO = event.datumDO;
  }

  activeTab: string = 'kategorija';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  prikazi(){ 
    console.log('Selected datumOD:', this.selectedDatumOD);
    console.log('Selected datumDO:', this.selectedDatumDO);
    this.updateData();
  }



























  proizvodjac: Proizvodjac[] = [
    new Proizvodjac('Toyota', 45),
    new Proizvodjac('BMW', 55),
    new Proizvodjac('Audi', 20),
    new Proizvodjac('Ford', 30),
    new Proizvodjac('Fiat', 40),
    new Proizvodjac('VW', 60),
  ];

  marka: Proizvodjac[] = [
    new Proizvodjac('SUV', 40),
    new Proizvodjac('Sedan', 70),
    new Proizvodjac('Coupe', 90),
  ];

  kategorija: Proizvodjac[] = [
    new Proizvodjac('Luksuz', 100),
    new Proizvodjac('Ekonomičan', 150),
    new Proizvodjac('Sportski', 50),
  ];

  // Funkcija za ažuriranje podataka
  updateData() {
    this.servis.dohvatiZaBrend(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.marka = data;
    });
    this.servis.dohvatiZaKategorija(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.kategorija = data;
    });
    this.servis.dohvatiZaProizvodjac(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.proizvodjac = data;
    });
  }

}
