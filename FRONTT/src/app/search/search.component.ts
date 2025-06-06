import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchCardComponent } from '../search-card/search-card.component';
import { Artikal } from '../1models/artikal';
import { ArtikalService } from '../1services/artikal.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  query: string = '';
  results: Artikal[] = [];
  showResults = false;
  servis = inject(ArtikalService)
  eRef = inject(ElementRef);
  router = inject(Router)

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.query = '';
        this.results = [];
        this.showResults = false;
      }
    });
  }

  search(){
    if (this.query.trim() === '') {this.showResults = false;return;}
    this.servis.pretraziArtikle(this.query).subscribe(
      (data) => {
        this.results = data;
        this.showResults = true;
      })
  }

  @HostListener('document:click', ['$event'])
clickOutside(event: MouseEvent) {
  // Proveri da li je kliknut element link (ili u linku)
  const target = event.target as HTMLElement;
  if (this.eRef.nativeElement.contains(target)) {
    if (target.closest('a')) {
      return;
    }
    return;
  }
  // Klik je van komponente — zatvori rezultate
  this.showResults = false;
}

}
