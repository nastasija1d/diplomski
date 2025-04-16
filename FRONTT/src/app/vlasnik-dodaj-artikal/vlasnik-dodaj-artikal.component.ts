import { Component } from '@angular/core';
import { VlasnikNoviArtikalKarticaComponent } from '../vlasnik-novi-artikal-kartica/vlasnik-novi-artikal-kartica.component';

@Component({
  selector: 'app-vlasnik-dodaj-artikal',
  standalone: true,
  imports: [VlasnikNoviArtikalKarticaComponent],
  templateUrl: './vlasnik-dodaj-artikal.component.html',
  styleUrl: './vlasnik-dodaj-artikal.component.css',
})
export class VlasnikDodajArtikalComponent {}
