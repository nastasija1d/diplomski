import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Artikal } from '../1models/artikal';

@Injectable({
  providedIn: 'root',
})
export class ArtikalService {
  constructor() {}

  http: HttpClient = inject(HttpClient);
  urlString: string = 'http://localhost:8080';

  //dohvatanje svih artikala
  getAll() {
    return this.http.get<Artikal[]>(this.urlString + '/artikal/svi');
  }

  //dohvatanje artikla po ID
  getById(id: string) {
    return this.http.get<Artikal>(this.urlString + '/artikal/' + id);
  }

  //dohvatanje svih artikala po podgrupi
  getAllOfPodgrupa(podgrupa: string) {
    return this.http.get<Artikal[]>(
      this.urlString + '/artikal/podgrupa/' + podgrupa
    );
  }

  dodajNoviArtikal(artikal: Artikal) {
    return this.http.post<number>(this.urlString + '/artikal/dodaj', artikal);
  }

  //filtriranje artikala po parametrima
  filtrirajArtikle(
    podgrupa: string,
    marka: string | null,
    proizvodjac: string | null,
    minKolicina: number | null,
    minCena: number | null,
    maxCena: number | null
  ) {
    let params = new HttpParams();
    if (marka) params = params.set('marka', marka);
    if (proizvodjac) params = params.set('proizvodjac', proizvodjac);
    if (minKolicina) params = params.set('minKolicina', minKolicina.toString());
    if (minCena) params = params.set('minCena', minCena.toString());
    if (maxCena) params = params.set('maxCena', maxCena.toString());

    return this.http.get<Artikal[]>(
      this.urlString + '/artikal/filter/' + podgrupa,
      { params }
    );
  }

  //dohvatanje svih grupa artikala
  getAllGrupe() {
    return this.http.get<string[]>(this.urlString + '/parametri/vrsta/svi');
  }

  //dohvatanje svih podgrupa GRUPE
  getAllPodgrupe(grupa: string) {
    return this.http.get<string[]>(
      this.urlString + '/parametri/vrsta/' + grupa
    );
  }
}
