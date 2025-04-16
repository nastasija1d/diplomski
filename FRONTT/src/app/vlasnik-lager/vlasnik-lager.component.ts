import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VlagerBrendComponent } from '../vlager-brend/vlager-brend.component';

@Component({
  selector: 'app-vlasnik-lager',
  standalone: true,
  imports: [CommonModule, VlagerBrendComponent],
  templateUrl: './vlasnik-lager.component.html',
  styleUrl: './vlasnik-lager.component.css'
})
export class VlasnikLagerComponent {
  activeTab: string = 'kategorija';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
