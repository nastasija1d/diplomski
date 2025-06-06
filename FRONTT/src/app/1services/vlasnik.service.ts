import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proizvodjac } from '../1models/proizvodjac';
import { Porudzbina } from '../1models/porudzbina';
import { Artikal } from '../1models/artikal';

@Injectable({
  providedIn: 'root'
})
export class VlasnikService {

  private url = 'http://localhost:8080/vlasnik/';
  http = inject(HttpClient);
  constructor() { }

  dohvatiZaBrend(datumOD: string, datumDO: string){
    let param = new HttpParams();
    param = param.set('datumOD', datumOD);
    param = param.set('datumDO', datumDO);
    return this.http.get<Proizvodjac[]>(this.url + 'finansije/brend', { params: param });
  }

  dohvatiZaKategorija(datumOD: string, datumDO: string){
    let param = new HttpParams();
    param = param.set('datumOD', datumOD);
    param = param.set('datumDO', datumDO);
    return this.http.get<Proizvodjac[]>(this.url + 'finansije/kategorija', { params: param });
  }

  dohvatiZaProizvodjac(datumOD: string, datumDO: string){
    let param = new HttpParams();
    param = param.set('datumOD', datumOD);
    param = param.set('datumDO', datumDO);
    return this.http.get<Proizvodjac[]>(this.url + 'finansije/proizvodjac', { params: param });
  }

  dohvatiPorudzbine(datumOD: string, datumDO: string){
    let param = new HttpParams();
    param = param.set('datumOD', datumOD);
    param = param.set('datumDO', datumDO);
    return this.http.get<Porudzbina[]>(this.url + 'finansije/porudzbine', { params: param });
  }

  dohvatiArtikle(datumOD: string, datumDO: string) {
    let param = new HttpParams();
    param = param.set('datumOD', datumOD);
    param = param.set('datumDO', datumDO);
    return this.http.get<Artikal[]>(this.url + 'finansije/artikli', { params: param });
  }

  //filtriranje artikala po parametrima
  filtrirajArtikle(
    vrsta: string | null,
    podvrsta: string | null,
    marka: string | null,
    proizvodjac: string | null,
    sortBy: string | null,
    page: number | null,
    size: number | null
  ) {
    let params = new HttpParams();
    if (sortBy) params = params.set('sortBy', sortBy);
    if (vrsta) params = params.set('vrsta', vrsta);
    if (podvrsta) params = params.set('podvrsta', podvrsta);
    if (marka) params = params.set('marka', marka);
    if (proizvodjac) params = params.set('proizvodjac', proizvodjac);
    if (page) params = params.set('page', page.toString());
    if (size) params = params.set('size', size.toString());

    return this.http.get<Artikal[]>(this.url + 'lager', { params });
  }

  
  
}
