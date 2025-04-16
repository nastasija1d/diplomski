import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ArtikalCardComponent } from '../artikal-card/artikal-card.component';
import { CommonModule } from '@angular/common';
import { Artikal } from '../1models/artikal';
import { ArtikalService } from '../1services/artikal.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParametriService } from '../1services/parametri.service';
import { Proizvodjac } from '../1models/proizvodjac';
import { DoubleSliderComponent } from '../double-slider/double-slider.component';

@Component({
  selector: 'app-artikli',
  standalone: true,
  imports: [
    ArtikalCardComponent,
    CommonModule,
    FormsModule,
    DoubleSliderComponent,
  ],
  templateUrl: './artikli.component.html',
  styleUrl: './artikli.component.css',
})
export class ArtikliComponent implements OnInit {
  artikalService = inject(ArtikalService);
  parametriService = inject(ParametriService);
  ruta = inject(ActivatedRoute);
  ruter = inject(Router);
  @ViewChild(DoubleSliderComponent) doubleSlider!: DoubleSliderComponent;

  artikli: Artikal[];
  proizvodjaci: Proizvodjac[] = [];
  marke: string[] = [];
  naziv: string = '';
  grupa: string = '';
  naslov: string = '';

  ukupno: number = 0;
  dostupno: number = 0;
  minCena: number = 0;
  maxCena: number = 0;

  odabranaMarka: string;
  odabraniProizvodjac: string;
  minKolicina: number;
  isLoading: boolean = false;
  isEmpty: boolean = false;
  lowerValue: number;
  upperValue: number;

  ngOnInit(): void {
    this.naziv = this.ruta.snapshot.paramMap.get('podgrupa');
    this.grupa = this.ruta.snapshot.paramMap.get('grupa');
    this.naslov = this.naziv.replace('_', ' ').toUpperCase();

    this.ruta.queryParams.subscribe((params) => {
      console.log('Query params:', params);
      this.odabranaMarka = params['marka'] || null;
      this.odabraniProizvodjac = params['proizvodjac'] || null;
      this.minKolicina = params['minKolicina'] ? +params['minKolicina'] : null;
      this.minCena = params['minCena'] ? +params['minCena'] : null; // Čitanje minCena
      this.maxCena = params['maxCena'] ? +params['maxCena'] : null; // Čitanje maxCena
    });

    //dohvatanje svih artikala iz podgrupe
    this.artikalService
      .filtrirajArtikle(
        this.naziv,
        this.odabranaMarka,
        this.odabraniProizvodjac,
        this.minKolicina,
        this.minCena,
        this.maxCena
      )
      .subscribe((data) => {
        this.artikli = data;
      });

    //dohvatanje svih proizvodjaca iz podgrupe
    this.parametriService
      .getAllProizvodjacOfPodgrupa(this.naziv)
      .subscribe((data) => {
        this.proizvodjaci = data;
      });

    //dohvatanje broja dostupnih artikala iz podgrupe
    this.parametriService
      .getDostupnoOfPodgrupa(this.naziv)
      .subscribe((data) => {
        [this.ukupno, this.dostupno] = data;
      });

    //dohvatanje svih marki
    this.parametriService.getAllMarka().subscribe((data) => {
      this.marke = data;
    });

    //dohvatanje min i max cene artikala iz podgrupe
    this.parametriService
      .getMinMaxCenaOfPodgrupa(this.naziv)
      .subscribe((data) => {
        [this.lowerValue, this.upperValue] = data;
      });
  }

  filtriraj() {
    if (this.doubleSlider) {
      this.minCena = this.doubleSlider.lowerValue;
      this.maxCena = this.doubleSlider.upperValue;
    } else {
      console.log('DoubleSlider komponenta nije pronađena.');
    }

    const queryParams: any = {};
    this.isLoading = true;

    if (this.odabranaMarka && this.odabranaMarka !== '') {
      queryParams['marka'] = this.odabranaMarka;
    }

    if (this.odabraniProizvodjac && this.odabraniProizvodjac !== '') {
      queryParams['proizvodjac'] = this.odabraniProizvodjac;
    }

    if (this.minKolicina) {
      queryParams['minKolicina'] = this.minKolicina;
    }

    if (this.minCena) {
      queryParams['minCena'] = this.minCena;
    }

    if (this.maxCena) {
      queryParams['maxCena'] = this.maxCena;
    }

    // Promeni URL sa novim query parametrima
    this.ruter.navigate([], {
      relativeTo: this.ruta,
      queryParams: queryParams, // Zadrži postojeće query parametre
    });

    setTimeout(() => {
      this.artikalService
        .filtrirajArtikle(
          this.naziv,
          this.odabranaMarka,
          this.odabraniProizvodjac,
          this.minKolicina,
          this.minCena,
          this.maxCena
        )
        .subscribe((data) => {
          this.artikli = data;
          this.isLoading = false;
          if (this.artikli.length === 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        });
    }, 1000); // 2 sekunde
  }
}
