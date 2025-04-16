import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PorudzbinaService } from '../1services/porudzbina.service';

@Component({
  selector: 'app-dugme-poruci',
  standalone: true,
  imports: [],
  templateUrl: './dugme-poruci.component.html',
  styleUrl: './dugme-poruci.component.css',
})
export class DugmePoruciComponent {
  ruter = inject(Router);
  servis = inject(PorudzbinaService);

  Poruci() {
    this.servis.naruci(1).subscribe((data) => {
      if (data >= 1) {
        alert('Porucili ste proizvod');
        this.servis.osveziBrojArtikala();
        this.ruter.navigate(['/pocetna']);
      } else {
        alert('NEUSPESNO');
      }
    });
  }
}
