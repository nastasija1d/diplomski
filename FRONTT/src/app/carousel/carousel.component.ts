import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides = [
    {
      imageUrl: 'c2.jpg',
      altText: 'Akcija -10%',
      title: 'Prolećna akcija',
      subtitle: 'Popusti na sve filtere do 10%'
    },
    {
      imageUrl: 'c1.jpg',
      altText: 'Besplatna dostava',
      title: 'Besplatna dostava',
      subtitle: 'Za porudžbine preko 5.000 RSD'
    },
    {
      imageUrl: 'c3.jpg',
      altText: 'Novo u ponudi',
      title:  'Samo original',
      subtitle: 'Sertifikovani brendovi. Garancija kvaliteta.'
    },
    {
      imageUrl: 'c4.jpg',
      altText: 'Akcija -10%',
      title: 'Maksimalne performanse',
      subtitle: 'Vrhunski delovi koji pokreću vaša vozila'
    },
       {
      imageUrl: 'c55.jpg',
      altText: 'Akcija -10%',
      title: 'Nega pre svega',
      subtitle: 'Proizvodi za ciscenje i zaštitu vozila'
    }
  ];

  currentSlide = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // promena na 5s
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

   isCarouselHidden = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isCarouselHidden = scrollY > 200;
  }
}