import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Artikal } from '../1models/artikal';
import { BehaviorSubject } from 'rxjs';
import { Porudzbina } from '../1models/porudzbina';

@Injectable({
  providedIn: 'root',
})
export class PorudzbinaService {
  http: HttpClient = inject(HttpClient);
  url = 'Http://localhost:8080';
  private itemCount = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCount.asObservable();

  constructor() {
    this.osveziBrojArtikala();
  }

  osveziBrojArtikala() {
    let param = new HttpParams();
    const idKorisnik = Number(localStorage.getItem('id'));
    param = param.set('korisnik', idKorisnik);
    this.http
      .get<number>(this.url + '/porudzbina/brojArtikala', {
        params: param,
      })
      .subscribe((data) => {
        this.itemCount.next(data);
      });
  }

  dodajUKorpu(idArtikl: number) {
    const idKorisnik = Number(localStorage.getItem('id'));
    const body = {
      idKorisnik: idKorisnik,
      idArtikl: idArtikl,
    };
    this.addItem();
    return this.http.post<number>(this.url + '/porudzbina/dodaj', body);
  }

  ukloniIzKorpe(idArtikl: number) {
    const idKorisnik = Number(localStorage.getItem('id'));
    const body = {
      idKorisnik: idKorisnik,
      idArtikl: idArtikl,
    };
    this.removeItem();
    return this.http.post<number>(this.url + '/porudzbina/ukloni', body);
  }

  izbaciJedan(idArtikl: number) {
    const idKorisnik = Number(localStorage.getItem('id'));
    const body = {
      idKorisnik: idKorisnik,
      idArtikl: idArtikl,
    };
    this.removeItem();
    return this.http.post<number>(this.url + '/porudzbina/izbaci', body);
  }

  dohvatiSveIzKorpe() {
    const idKorisnik = Number(localStorage.getItem('id'));
    let param = new HttpParams();
    param = param.set('korisnik', idKorisnik);
    return this.http.get<Artikal[]>(this.url + '/porudzbina/korpa', {
      params: param,
    });
  }

  naruci() {
    const idKorisnik = Number(localStorage.getItem('id'));
    const body = {
      idKorisnik: idKorisnik,
      idArtikl: 0,
    };
    return this.http.post<number>(this.url + '/porudzbina/naruci', body);
  }

  vlasikAktivnePorudzbine() {
    return this.http.get<Porudzbina[]>(this.url + '/porudzbina/dohvatiAktivne');
  }

  vlasnikPosaljiPorudzbinu(idPorudzbina: number) {
    return this.http.post<number>(
      this.url + '/porudzbina/posalji',
      idPorudzbina
    );
  }

  private addItem() {
    this.itemCount.next(this.itemCount.value + 1);
  }

  private removeItem() {
    this.itemCount.next(Math.max(0, this.itemCount.value - 1));
  }
}
