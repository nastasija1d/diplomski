import { Component, inject, Input, OnInit } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-artikal-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './artikal-card.component.html',
  styleUrl: './artikal-card.component.css',
})
export class ArtikalCardComponent implements OnInit {
  ngOnInit(): void {
    this.dodato = 0;
    this.naStanju = this.artikal.kolicina > 0;
  }
  @Input() artikal: Artikal;
  porudzbinaService = inject(PorudzbinaService);
  showToast = false;
  message: string;
  dodato: number;
  naStanju: boolean;

  dodajUKorpu() {
    if (this.artikal.kolicina == 0) {
      this.message = 'Nema na stanju';
    } else if (this.artikal.kolicina == this.dodato + this.artikal.korpa) {
      this.message = 'Maksimalna kolicina dostignuta';
    } else {
      this.dodato++;
      this.message = 'Artikal dodat u korpu';
      this.porudzbinaService.dodajUKorpu(this.artikal.id, 1).subscribe();
    }
    // Prikaži oblačić
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 1000);
  }
}
