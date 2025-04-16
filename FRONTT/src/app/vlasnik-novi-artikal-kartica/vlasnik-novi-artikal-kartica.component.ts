import { Component, inject, OnInit } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParametriService } from '../1services/parametri.service';
import { ArtikalService } from '../1services/artikal.service';

@Component({
  selector: 'app-vlasnik-novi-artikal-kartica',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vlasnik-novi-artikal-kartica.component.html',
  styleUrl: './vlasnik-novi-artikal-kartica.component.css',
})
export class VlasnikNoviArtikalKarticaComponent implements OnInit {
  artikal: Artikal;
  disabled: boolean;
  servis = inject(ParametriService);
  servis2 = inject(ArtikalService);
  vrsta: string;
  podvrsta: string;
  marka: string;
  proizvodjac: string;
  naziv: string;
  kolicina: number;
  cena_prodajna: number;
  cena_nabavna: number;

  vrstaOptions: string[];
  podvrstaOptions: string[];
  markaOptions: string[];
  proizvodjacOptions: string[];

  ngOnInit(): void {
    this.disabled = true;
    this.servis.getAllVrsta().subscribe((data) => {
      this.vrstaOptions = data;
    });

    this.servis.getAllProizvodjac().subscribe((data) => {
      this.proizvodjacOptions = data;
    });

    this.servis.getAllMarka().subscribe((data) => {
      this.markaOptions = data;
    });
  }

  onVrstaChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.servis.getAllPodVrsta(selectedValue).subscribe((data) => {
      this.podvrstaOptions = data;
      this.disabled = false;
    });
  }

  dodaj() {
    this.artikal = new Artikal(
      0,
      this.naziv,
      this.proizvodjac,
      this.marka,
      this.vrsta,
      this.podvrsta,
      this.kolicina,
      this.cena_prodajna,
      this.cena_nabavna,
      0
    );
    this.servis2.dodajNoviArtikal(this.artikal).subscribe((data) => {
      if (data > 0) alert('USPESNO DODATO!');
      window.location.reload();
    });
  }
}
