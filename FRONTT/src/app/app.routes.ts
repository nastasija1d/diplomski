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
import { VlasnikFinansijeComponent } from './vlasnik-finansije/vlasnik-finansije.component';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './role.guard';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  // javne rute
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: 'artikal/:id', component: ArtikalPageComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'login', component: LoginComponent},
  { path: 'pocetna', component: PocetnaComponent },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN', 'KUPAC'] }  // dozvoljene uloge za ovu rutu
  },

  // rute za KUPCA
  {
    path: 'korpa',
    component: KorpaComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'KUPAC' }
  },
  {
    path: 'pregled-porudzbine',
    component: PregledPorudzbineComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'KUPAC' }
  },

  // rute za ADMINA (vlasnika)
  {
    path: 'vlasnik/pocetna',
    component: VlasnikPocetnaComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'vlasnik/finansije',
    component: VlasnikFinansijeComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'vlasnik/aktivne-porudzbine',
    component: VlasnikAktivnePorudzbineComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'vlasnik/dodaj-artikal',
    component: VlasnikDodajArtikalComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'vlasnik/lager',
    component: VlasnikLagerComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' }
  },

  // ostale rute za sve
  { path: ':grupa', component: PodgrupeComponent },
  { path: ':grupa/:podgrupa', component: ArtikliComponent },
];

