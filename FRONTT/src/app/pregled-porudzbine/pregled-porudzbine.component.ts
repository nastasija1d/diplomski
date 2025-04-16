import { Component, inject, OnInit } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { CommonModule } from '@angular/common';
import { DugmePoruciComponent } from '../dugme-poruci/dugme-poruci.component';

@Component({
  selector: 'app-pregled-porudzbine',
  standalone: true,
  imports: [CommonModule, DugmePoruciComponent],
  templateUrl: './pregled-porudzbine.component.html',
  styleUrl: './pregled-porudzbine.component.css',
})
export class PregledPorudzbineComponent implements OnInit {
  artikli: Artikal[];
  servis = inject(PorudzbinaService);
  total: number;
  dostava: number;
  totaltotal: number;

  ngOnInit(): void {
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
}
