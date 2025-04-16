import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podgrupa-card',
  standalone: true,
  imports: [],
  templateUrl: './podgrupa-card.component.html',
  styleUrl: './podgrupa-card.component.css',
})
export class PodgrupaCardComponent implements OnInit {
  @Input() grupa: string;
  @Input() podgrupa: string;
  ruter = inject(Router);
  strG: string;
  strP: string;
  slika: string;

  ngOnInit(): void {
    this.slika =
      'http://localhost:8080/slika/podgrupa/' +
      this.podgrupa.replaceAll(' ', '_');
  }

  klik() {
    this.strG = this.grupa.replaceAll(' ', '_');
    this.strP = this.podgrupa.replaceAll(' ', '_');
    this.ruter.navigate([this.strG, this.strP]);
  }
}
