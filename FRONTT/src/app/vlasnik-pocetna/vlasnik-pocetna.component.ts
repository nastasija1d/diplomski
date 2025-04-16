import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vlasnik-pocetna',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vlasnik-pocetna.component.html',
  styleUrl: './vlasnik-pocetna.component.css',
})
export class VlasnikPocetnaComponent implements OnInit {
  cards = [
    {
      title: 'Aktivne porudzbine',
      image: 'vlasnik/package.png',
      description: 'Pregledaj sve nove porudzbine',
      link: '/vlasnik/aktivne-porudzbine',
    },
    {
      title: 'Finansije',
      image: 'vlasnik/bar-chart.png',
      description: 'Pregledaj sve prethodne porudzbine i finansije',
      link: '/orders',
    },
    {
      title: 'Lager',
      image: 'vlasnik/warehouse.png',
      description: 'Pregledaj ceo lager, sva roba na jednom mestu',
      link: '/vlasnik/lager',
    },
    {
      title: 'Dodaj proizvod',
      image: 'vlasnik/basket.png',
      description: 'Dodaj novi proizvod u ponudu ili poruci robu',
      link: '/vlasnik/dodaj-artikal',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
