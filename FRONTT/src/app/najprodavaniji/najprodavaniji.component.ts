import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { ArtikalService } from '../1services/artikal.service';

@Component({
  selector: 'app-najprodavaniji',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './najprodavaniji.component.html',
  styleUrl: './najprodavaniji.component.css'
})
export class NajprodavanijiComponent implements AfterViewInit, OnInit {

  ngOnInit(): void {
    this.servis.getBestSellers().subscribe((data) => {
      this.bestSellers = data;
      console.log(this.bestSellers);
    });
  }

  bestSellers : Artikal[] = []
  servis = inject(ArtikalService);

  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLElement>;
  @ViewChildren('cardRef') cards!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    // intersection observer za animaciju prikazivanja
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      },
      {threshold: 0.3} );

    // posmatramo svaku karticu
    this.cards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }

    scrollLeft(): void {
      this.carousel.nativeElement.scrollBy({ left: -320, behavior: 'smooth' });
    }

    scrollRight(): void {
      this.carousel.nativeElement.scrollBy({ left: 320, behavior: 'smooth' });
    }

}
