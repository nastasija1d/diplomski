import { Component, inject, OnInit } from '@angular/core';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CalendarComponent } from "../calendar/calendar.component";
import { Proizvodjac } from '../1models/proizvodjac';
import { CommonModule } from '@angular/common';
import { VlasnikService } from '../1services/vlasnik.service';
import { Porudzbina } from '../1models/porudzbina';
import { Artikal } from '../1models/artikal';

@Component({
  selector: 'app-vlasnik-finansije',
  standalone: true,
  imports: [PieChartComponent, CalendarComponent, CommonModule],
  templateUrl: './vlasnik-finansije.component.html',
  styleUrl: './vlasnik-finansije.component.css'
})
export class VlasnikFinansijeComponent implements OnInit {

  proizvodjac: Proizvodjac[] = [];
  marka: Proizvodjac[] = [];
  kategorija: Proizvodjac[] = [];
  porudzbine: Porudzbina[] = [];
  artikli : Artikal[] = [];

  selectedDatumOD: string | null = null;
  selectedDatumDO: string | null = null;
  datumOD: string | null = null;
  datumDO: string | null = null;
  servis = inject(VlasnikService);
  activeTab: string = 'kategorija';

  ukupnoProdato: number = 0;
  ukupnoZarada: number = 0;

  prikaziTabele : boolean = false;

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() vraća 0-11, pa dodajemo +1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.datumOD = formattedDate;
    this.datumDO = formattedDate;
    this.servis.dohvatiZaBrend(formattedDate, formattedDate).subscribe((data) => {
      this.marka = data;
      if (this.marka.length > 0){this.prikaziTabele = true;} else {this.prikaziTabele = false;}
    });
    this.servis.dohvatiZaKategorija(formattedDate, formattedDate).subscribe((data) => {
      this.kategorija = data;
    });
    this.servis.dohvatiZaProizvodjac(formattedDate, formattedDate).subscribe((data) => {
      this.proizvodjac = data;
    });
    this.servis.dohvatiPorudzbine(formattedDate, formattedDate).subscribe((data) => {
      this.porudzbine = data;
      this.popuni();
    });
    this.servis.dohvatiArtikle(formattedDate, formattedDate).subscribe((data) => {
      this.artikli = data;
    });

  }

  onDatumiChanged(event: { datumOD: string | null, datumDO: string | null }) {
    this.selectedDatumOD = event.datumOD;
    this.selectedDatumDO = event.datumDO;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  prikaziSve = false;
  prikaziSveArtikle = false;

  get prikazanePorudzbine() {
    return this.prikaziSve ? this.porudzbine : this.porudzbine.slice(0, 5);
  }

  get prikazaniArtikli() {
    return this.prikaziSveArtikle ? this.artikli : this.artikli.slice(0, 5);
  }

  prikazi(){
    this.datumOD = this.selectedDatumOD;
    this.datumDO = this.selectedDatumDO; 
    this.servis.dohvatiZaBrend(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.marka = data;   
      if (this.marka.length > 0){this.prikaziTabele = true;} else {this.prikaziTabele = false;}
    });
    this.servis.dohvatiZaKategorija(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.kategorija = data;
    });
    this.servis.dohvatiZaProizvodjac(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.proizvodjac = data;
    });
    this.servis.dohvatiPorudzbine(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.porudzbine = data;
      this.popuni();
    });
    this.servis.dohvatiArtikle(this.selectedDatumOD!, this.selectedDatumDO!).subscribe((data) => {
      this.artikli = data;
    });
    
  }

  popuni() {
    this.ukupnoProdato = 0;
    this.ukupnoZarada = 0;
    for(let p of this.porudzbine){
      console.log(p);
      this.ukupnoProdato += p.idStatus;
      this.ukupnoZarada += p.iznos;
    }
  }

}
