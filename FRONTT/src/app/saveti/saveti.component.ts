import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-saveti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saveti.component.html',
  styleUrl: './saveti.component.css'
})
export class SavetiComponent {

  saveti = [
    {
      ikona: '🛢️',
      naslov: 'Kada zameniti ulje i filtere?',
      opis: 'Redovna zamena ulja štiti motor i produžava mu vek trajanja. Saznaj koji su intervali idealni.'
    },
    {
      ikona: '🔋',
      naslov: 'Kako znati da je akumulator pri kraju?',
      opis: 'Sporo paljenje, slaba svetla i problemi pri startovanju ukazuju na slab akumulator.'
    },
    {
      ikona: '🚘',
      naslov: 'Kako prepoznati istrošene kočione pločice?',
      opis: 'Cviljenje, slabije kočenje i duži put zaustavljanja znak su da je vreme za zamenu.'
    }
  ];

  @ViewChildren('card') cards!: QueryList<ElementRef>;

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

    this.cards.forEach((card, i) => {
      const el = card.nativeElement as HTMLElement;
      el.style.transitionDelay = `${i * 150}ms`;
      observer.observe(el);
    });
  }

}
