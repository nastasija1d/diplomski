import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { KorpaIkonaComponent } from './korpa-ikona/korpa-ikona.component';
import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, KorpaIkonaComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FRONT';
}
