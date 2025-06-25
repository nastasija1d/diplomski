import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GrupaCardComponent } from '../grupa-card/grupa-card.component';
import { ArtikalService } from '../1services/artikal.service';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../carousel/carousel.component";
import { UputstvoComponent } from "../uputstvo/uputstvo.component";
import { KontaktComponent } from "../kontakt/kontakt.component";
import { NajprodavanijiComponent } from "../najprodavaniji/najprodavaniji.component";
import { SavetiComponent } from "../saveti/saveti.component";
import { GrupeStranicaComponent } from '../grupe-stranica/grupe-stranica.component';

@Component({
  selector: 'app-pocetna',
  standalone: true,
  imports: [CommonModule, CarouselComponent, UputstvoComponent, KontaktComponent, NajprodavanijiComponent, SavetiComponent, GrupeStranicaComponent],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css',
})
export class PocetnaComponent implements OnInit, AfterViewInit {
  artiklServis = inject(ArtikalService);
  grupe: string[] = [];

  ngOnInit(): void {
    this.artiklServis.getAllGrupe().subscribe((data) => {
      this.grupe = data;
      console.log('Grupe:', this.grupe);
    });
  }
  brands = [
    {
      name: 'BMW',
      logo: 'http://localhost:8080/slika/marka/BMW',
      description: 'BMW je nemački proizvođač automobila poznat po luksuzu i sportskim performansama.'
    },
    {
      name: 'MERCEDES',
      logo: 'http://localhost:8080/slika/marka/mercedes',
      description: 'Mercedes-Benz je simbol elegancije, inovacija i vrhunskog kvaliteta.'
    },
    {
      name: 'OPEL',
      logo: 'http://localhost:8080/slika/marka/opel',
      description: 'Opel nudi širok spektar vozila sa naglaskom na pouzdanost i dostupnost.'
    },
    {
      name: 'VOLKSWAGEN',
      logo: 'http://localhost:8080/slika/marka/vw',
      description: 'Volkswagen kombinuje nemačku preciznost sa praktičnim dizajnom.'
    },
    {
      name: 'FORD',
      logo: 'http://localhost:8080/slika/marka/ford',
      description: 'Ford je pionir u automobilskoj industriji sa snažnim i izdržljivim vozilima.'
    },
    {
      name: 'FIAT',
      logo: 'http://localhost:8080/slika/marka/fiat',
      description: 'Fiat donosi italijanski duh i kompaktnost u svet automobila.'
    }
  ];

  visibleCards: number[] = [];

@ViewChildren('cardRef') cards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        } else {
          element.classList.remove('in-view'); // reset kada izađe iz pogleda
        }
      });
    },
    { threshold: 0.2 }
  );

  this.cards.forEach((card) => {
    observer.observe(card.nativeElement);
  });
}

}
