import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { KorpaIkonaComponent } from './korpa-ikona/korpa-ikona.component';
import { SearchComponent } from "./search/search.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, KorpaIkonaComponent, SearchComponent, SideBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidebarOpen = false;
  title = 'FRONT';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

get userRole(): string | null {
  const tip = localStorage.getItem('tip');
  if (tip === '1') return 'KUPAC';
  if (tip === '2') return 'ADMIN';
  return null;
}

}
