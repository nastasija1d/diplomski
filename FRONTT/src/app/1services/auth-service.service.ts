import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Korisnik } from '../1models/korisnik';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private apiUrl = 'http://localhost:8080/auth';

  // Observable koji "emituje" trenutno stanje prijave korisnika
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, lozinka: string) {
    return this.http
      .post<{ token: string; tip: string, id: string }>(
        `${this.apiUrl}/login`,
        { email, lozinka }
      )
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('tip', res.tip);
          localStorage.setItem('id', res.id); 
          this.loggedIn.next(true); // prijavljen korisnik
        })
      );
  }

  // Metoda za dobijanje profila
  getProfil(): Observable<Korisnik> {
    const token = this.getToken();

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    return this.http.get<Korisnik>(`${this.apiUrl}/profil`, { headers });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tip');
    localStorage.removeItem('id'); 
    this.loggedIn.next(false); // odjavljen korisnik
  }

  isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  if (this.isTokenExpired()) {
    this.logout(); // automatski logout
    return false;
  }

  return true;
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const tip = localStorage.getItem('tip');
    if (tip === '2') return 'ADMIN';
    if (tip === '1') return 'KUPAC';
    return null;
  }

  // (opciono) ako ti treba imejl iz tokena
  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    try {
      const decoded = JSON.parse(atob(payload));
      return decoded.sub || null;
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp;
  const now = Math.floor(Date.now() / 1000);

  return now > expiry;
}

}
