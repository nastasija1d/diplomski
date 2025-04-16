import { Component, inject } from '@angular/core';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-korpa-ikona',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './korpa-ikona.component.html',
  styleUrl: './korpa-ikona.component.css',
})
export class KorpaIkonaComponent {
  servis = inject(PorudzbinaService);
  itemCount$ = this.servis.itemCount$;
}
