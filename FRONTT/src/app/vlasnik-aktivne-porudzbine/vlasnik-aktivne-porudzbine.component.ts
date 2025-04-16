import { Component, inject, OnInit } from '@angular/core';
import { VlasnikPorudzbinaKarticaComponent } from '../vlasnik-porudzbina-kartica/vlasnik-porudzbina-kartica.component';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { Porudzbina } from '../1models/porudzbina';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vlasnik-aktivne-porudzbine',
  standalone: true,
  imports: [CommonModule, VlasnikPorudzbinaKarticaComponent],
  templateUrl: './vlasnik-aktivne-porudzbine.component.html',
  styleUrl: './vlasnik-aktivne-porudzbine.component.css',
})
export class VlasnikAktivnePorudzbineComponent implements OnInit {
  servis = inject(PorudzbinaService);
  svePorudzbine: Porudzbina[] = [];

  ngOnInit(): void {
    this.servis.vlasikAktivnePorudzbine().subscribe((data) => {
      this.svePorudzbine = data;
    });
  }
}
