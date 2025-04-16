import { Routes } from '@angular/router';
import { ArtikliComponent } from './artikli/artikli.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PodgrupeComponent } from './podgrupe/podgrupe.component';
import { KorpaComponent } from './korpa/korpa.component';
import { PregledPorudzbineComponent } from './pregled-porudzbine/pregled-porudzbine.component';
import { ArtikalPageComponent } from './artikal-page/artikal-page.component';
import { VlasnikPocetnaComponent } from './vlasnik-pocetna/vlasnik-pocetna.component';
import { VlasnikAktivnePorudzbineComponent } from './vlasnik-aktivne-porudzbine/vlasnik-aktivne-porudzbine.component';
import { VlasnikDodajArtikalComponent } from './vlasnik-dodaj-artikal/vlasnik-dodaj-artikal.component';
import { VlasnikLagerComponent } from './vlasnik-lager/vlasnik-lager.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: 'artikal/:id', component: ArtikalPageComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'korpa', component: KorpaComponent },
  { path: 'pregled-porudzbine', component: PregledPorudzbineComponent },
  { path: 'vlasnik/pocetna', component: VlasnikPocetnaComponent },
  {
    path: 'vlasnik/aktivne-porudzbine',
    component: VlasnikAktivnePorudzbineComponent,
  },
  { path: 'vlasnik/dodaj-artikal', component: VlasnikDodajArtikalComponent },
  { path: 'vlasnik/lager', component: VlasnikLagerComponent},
  { path: ':grupa', component: PodgrupeComponent },
  { path: ':grupa/:podgrupa', component: ArtikliComponent },
];
