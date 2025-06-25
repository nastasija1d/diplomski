import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ArtikalService } from '../1services/artikal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupe-stranica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupe-stranica.component.html',
  styleUrl: './grupe-stranica.component.css'
})
export class GrupeStranicaComponent implements AfterViewInit, OnInit {
  artiklServis = inject(ArtikalService);
  items: string[] = [];
  ruter = inject(Router);

  @ViewChildren('card') cards!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.artiklServis.getAllGrupe().subscribe((data) => {
      this.items = data;
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    // posmatramo promene u DOM-u kada se kartice pojave
    this.cards.changes.subscribe((cards: QueryList<ElementRef>) => {
      cards.forEach((card, i) => {
        const el = card.nativeElement as HTMLElement;
        el.style.transitionDelay = `${i * 150}ms`;
        observer.observe(el);
      });
    });

    // Ako su se možda već pojavile (u slučaju kad se ne ide preko async dohvatanja)
    if (this.cards.length) {
      this.cards.forEach((card, i) => {
        const el = card.nativeElement as HTMLElement;
        el.style.transitionDelay = `${i * 150}ms`;
        observer.observe(el);
      });
    }
  }

  formatPodVrsta(podVrsta: string): string {
    return podVrsta.trim().split(' ').join('_');
  }
  klik(s:string){
    const formatted = s.replaceAll(' ', '_');
    this.ruter.navigate(['/', formatted]);
  }
}
