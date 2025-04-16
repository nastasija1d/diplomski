import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { KorpaStavkaComponent } from '../korpa-stavka/korpa-stavka.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korpa',
  standalone: true,
  imports: [CommonModule, KorpaStavkaComponent],
  templateUrl: './korpa.component.html',
  styleUrl: './korpa.component.css',
})
export class KorpaComponent implements OnInit {
  artikli: Artikal[] = [];
  servis = inject(PorudzbinaService);
  ruter = inject(Router);
  total: number;
  dostava: number;
  totaltotal: number;

  ngOnInit(): void {
    this.refresh();
  }
  nastaviKaPlacanju() {
    this.ruter.navigate(['/pregled-porudzbine']);
  }

  refresh() {
    this.artikli;
    this.servis.dohvatiSveIzKorpe(1).subscribe((data) => {
      this.artikli = data;
      this.total = 0;
      for (let artikal of this.artikli) {
        this.total += artikal.cena_prodajna * artikal.korpa;
      }
      if (this.total < 5000) {
        this.dostava = 500;
      } else {
        this.dostava = 0;
      }
      this.totaltotal = this.total + this.dostava;
    });
  }

  showDialog: boolean = false;
  artikalZaUklanjanje: Artikal | null = null;

  onRemoveRequested(artikal: Artikal) {
    this.artikalZaUklanjanje = artikal;
    this.showDialog = true;
  }

  confirmRemoval() {
    if (this.artikalZaUklanjanje) {
      this.servis
        .ukloniIzKorpe(this.artikalZaUklanjanje.id, 1)
        .subscribe((data) => {
          if (data == 1) {
            this.refresh();
          }
        });
    }
    this.cancelRemoval();
  }

  cancelRemoval() {
    this.showDialog = false;
    this.artikalZaUklanjanje = null;
  }
}
