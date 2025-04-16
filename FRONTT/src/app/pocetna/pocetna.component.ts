import { Component, inject, OnInit } from '@angular/core';
import { GrupaCardComponent } from '../grupa-card/grupa-card.component';
import { ArtikalService } from '../1services/artikal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pocetna',
  standalone: true,
  imports: [GrupaCardComponent, CommonModule],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css',
})
export class PocetnaComponent implements OnInit {
  artiklServis = inject(ArtikalService);
  grupe: string[] = [];

  ngOnInit(): void {
    this.artiklServis.getAllGrupe().subscribe((data) => {
      this.grupe = data;
    });
  }
}
