import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Korisnik } from '../1models/korisnik';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  http: HttpClient = inject(HttpClient);
  url = 'Http://localhost:8080';

  registruj(k: Korisnik) {
    return this.http.post<number>(this.url + '/korisnik/registracija', k);
  }

  constructor() {}
}
