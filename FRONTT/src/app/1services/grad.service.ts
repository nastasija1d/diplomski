import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Grad } from '../1models/grad';

@Injectable({
  providedIn: 'root',
})
export class GradService {
  http: HttpClient = inject(HttpClient);

  getAll() {
    return this.http.get<Grad[]>('http://localhost:8080/grad/svi');
  }

  constructor() {}
}
