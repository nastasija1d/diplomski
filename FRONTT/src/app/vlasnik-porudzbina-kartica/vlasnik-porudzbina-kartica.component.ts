import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Porudzbina } from '../1models/porudzbina';
import { Artikal } from '../1models/artikal';
import { PorudzbinaService } from '../1services/porudzbina.service';

@Component({
  selector: 'app-vlasnik-porudzbina-kartica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vlasnik-porudzbina-kartica.component.html',
  styleUrl: './vlasnik-porudzbina-kartica.component.css',
})
export class VlasnikPorudzbinaKarticaComponent {
  servis = inject(PorudzbinaService);
  @Input() porudzbina: Porudzbina;
  isExpanded = false;
  showOverlay = false;

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  posalji() {
    this.servis
      .vlasnikPosaljiPorudzbinu(this.porudzbina.idPorudzbina)
      .subscribe((data) => {
        this.showOverlay = true;
        // Nakon 2 sekunde refreshujemo celu stranicu
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      });
  }
}
