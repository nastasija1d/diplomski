import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proizvodjac } from '../1models/proizvodjac';

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

  
  
}
