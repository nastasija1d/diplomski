import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ParametriService } from '../1services/parametri.service';
import { Artikal } from '../1models/artikal';
import { FormsModule } from '@angular/forms';
import { VlasnikService } from '../1services/vlasnik.service';

@Component({
  selector: 'app-vlasnik-lager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vlasnik-lager.component.html',
  styleUrl: './vlasnik-lager.component.css'
})
export class VlasnikLagerComponent {
  artikli: Artikal[];
    disabled: boolean;
    servis = inject(ParametriService);
    servis2 = inject(VlasnikService);
    vrsta: string;
    podvrsta: string;
    marka: string;
    proizvodjac: string;
  
    vrstaOptions: string[] = [];
    podvrstaOptions: string[] = [] ;
    markaOptions: string[] = [];
    proizvodjacOptions: string[] = [];

    currentPage = 0;
    pageSize = 100;
    hasNextPage = false;
    sortParametar = 'a.idArtikl';

  
    ngOnInit(): void {
      this.disabled = true;
      this.servis.getAllVrsta().subscribe((data) => {
        this.vrstaOptions = data;
      });
  
      this.servis.getAllProizvodjac().subscribe((data) => {
        this.proizvodjacOptions = data;
      });
  
      this.servis.getAllMarka().subscribe((data) => {
        this.markaOptions = data;
      });
    }
  
    onVrstaChange(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.servis.getAllPodVrsta(selectedValue).subscribe((data) => {
        this.podvrstaOptions = data;
        this.disabled = false;
      });
    }

    loadArtikli() {
      console.log(this.vrsta, this.podvrsta, this.marka, this.proizvodjac, this.sortParametar, this.currentPage, this.pageSize);
      this.servis2.filtrirajArtikle(this.vrsta,this.podvrsta,this.marka,this.proizvodjac,this.sortParametar, this.currentPage, this.pageSize).subscribe((data) => {
        this.artikli = data;
      });
    }

    load(){
      this.currentPage = 0;
      this.loadArtikli();
    }

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.loadArtikli();
      }
    }

    nextPage() {
        this.currentPage++;
        this.loadArtikli();
    
    }

    onFilterChange() {
      this.currentPage = 0;
    }

}
