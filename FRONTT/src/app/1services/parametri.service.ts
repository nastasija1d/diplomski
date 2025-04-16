import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proizvodjac } from '../1models/proizvodjac';

@Injectable({
  providedIn: 'root',
})
export class ParametriService {
  constructor() {}
  http = inject(HttpClient);
  urlString: string = 'http://localhost:8080';

  //dohvatanje svih proizvodjaca
  getAllProizvodjac() {
    return this.http.get<string[]>(
      this.urlString + '/parametri/proizvodjac/svi'
    );
  }

  //dohvatanje proizvodjaca PO PODGRUPI
  getAllProizvodjacOfPodgrupa(podgrupa: string) {
    return this.http.get<Proizvodjac[]>(
      this.urlString + '/parametri/proizvodjac/' + podgrupa
    );
  }

  //dohvatanje svih marki
  getAllMarka() {
    return this.http.get<string[]>(this.urlString + '/parametri/marka/svi');
  }

  getAllVrsta() {
    return this.http.get<string[]>(this.urlString + '/parametri/vrsta/svi');
  }

  getAllPodVrsta(grupa: string) {
    return this.http.get<string[]>(
      this.urlString + '/parametri/vrsta/' + grupa
    );
  }

  getDostupnoOfPodgrupa(podgrupa: string) {
    return this.http.get<number[]>(
      this.urlString + '/parametri/dostupno/' + podgrupa
    );
  }

  getMinMaxCenaOfPodgrupa(podgrupa: string) {
    return this.http.get<number[]>(
      this.urlString + '/parametri/minmaxcena/' + podgrupa
    );
  }
}
