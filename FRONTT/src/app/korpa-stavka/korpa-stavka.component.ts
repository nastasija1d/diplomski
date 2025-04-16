import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Artikal } from '../1models/artikal';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-korpa-stavka',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './korpa-stavka.component.html',
  styleUrl: './korpa-stavka.component.css',
})
export class KorpaStavkaComponent implements OnInit {
  @Input() artikal: Artikal;
  @Output() removeRequested = new EventEmitter<Artikal>();
  @Output() refresh = new EventEmitter<void>();
  servis = inject(PorudzbinaService);

  total: number = 0;
  slika: string;
  message: string;
  showToast: boolean;

  ngOnInit(): void {
    while (this.artikal.korpa > this.artikal.kolicina) {
      this.decrement();
    }
    this.showToast = false;
    this.message = '';
    this.total = this.artikal.cena_prodajna * this.artikal.korpa;
    this.slika =
      'http://localhost:8080/slika/podgrupa/' +
      this.artikal.podVrsta.replaceAll(' ', '_');
  }

  increment() {
    if (this.artikal.korpa >= this.artikal.kolicina) {
      this.message = 'Trenutno nemamo vise artikala na stanju';
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
      return;
    }
    this.artikal.korpa++;
    this.total = this.artikal.cena_prodajna * this.artikal.korpa;
    this.servis.dodajUKorpu(this.artikal.id, 1).subscribe((data) => {
      if (data == 1) {
        this.refresh.emit();
      }
    });
  }

  decrement() {
    if (this.artikal.korpa > 1) {
      this.artikal.korpa--;
      this.total = this.artikal.cena_prodajna * this.artikal.korpa;
      this.servis.izbaciJedan(this.artikal.id, 1).subscribe((data) => {
        if (data == 1) {
          this.refresh.emit();
        }
      });
    } else {
      this.requestRemoval();
    }
  }

  requestRemoval() {
    this.removeRequested.emit(this.artikal);
  }
}
