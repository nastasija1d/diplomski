import { Component, Input, OnInit } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent implements OnInit {
  ngOnInit(): void {
      this.slika =
        'http://localhost:8080/slika/podgrupa/' +
        this.item.podVrsta.replaceAll(' ', '_');
  }

  @Input() item:Artikal;
  slika: string;

}
