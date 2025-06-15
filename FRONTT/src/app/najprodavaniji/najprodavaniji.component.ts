import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { ArtikalService } from '../1services/artikal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-najprodavaniji',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './najprodavaniji.component.html',
  styleUrl: './najprodavaniji.component.css'
})
export class NajprodavanijiComponent implements  OnInit {

  ngOnInit(): void {
    this.servis.getBestSellers().subscribe((data) => {
      this.bestSellers = data;
      console.log(this.bestSellers);
    });
  }

  bestSellers : Artikal[] = []
  servis = inject(ArtikalService);

 @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  scroll(direction: number) {
    const container = this.cardContainer.nativeElement;
    const scrollAmount = 250;
    container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  }

  formatPodVrsta(podVrsta: string): string {
  return podVrsta.trim().split(' ').join('_');
  // ili: return podVrsta.replace(/\s+/g, '_'); // za više razmaka
}

}
