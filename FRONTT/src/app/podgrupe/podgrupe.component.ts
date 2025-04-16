import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtikalService } from '../1services/artikal.service';
import { PodgrupaCardComponent } from '../podgrupa-card/podgrupa-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-podgrupe',
  standalone: true,
  imports: [PodgrupaCardComponent, CommonModule],
  templateUrl: './podgrupe.component.html',
  styleUrl: './podgrupe.component.css',
})
export class PodgrupeComponent implements OnInit {
  ruta = inject(ActivatedRoute);
  artiklServis = inject(ArtikalService);
  podgrupe: string[] = [];
  grupa = '';
  naziv = '';

  ngOnInit(): void {
    this.grupa = this.ruta.snapshot.paramMap.get('grupa');
    this.naziv = this.grupa.replaceAll('_', ' ');
    this.artiklServis.getAllPodgrupe(this.grupa).subscribe((data) => {
      this.podgrupe = data;
    });
  }
}
