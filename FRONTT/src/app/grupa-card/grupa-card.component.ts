import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupa-card',
  standalone: true,
  imports: [],
  templateUrl: './grupa-card.component.html',
  styleUrl: './grupa-card.component.css',
})
export class GrupaCardComponent implements OnInit {
  @Input() grupa: string;
  ruter = inject(Router);
  str = '';
  slika: string;

  ngOnInit(): void {
    this.slika =
      'http://localhost:8080/slika/grupa/' +
      this.grupa.replaceAll(' ', '_');
  }

  klik() {
    this.str = this.grupa.replaceAll(' ', '_');
    this.ruter.navigate([this.str]);
  }
}
