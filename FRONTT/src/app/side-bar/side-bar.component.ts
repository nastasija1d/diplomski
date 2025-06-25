import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter,
  inject
} from '@angular/core';
import { ParametriService } from '../1services/parametri.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  ruter = inject(Router);

  productGroups: string[] = [];
  subgroups: Record<string, string[]> = {};
  selectedGroup: string | null = null;
  showProizvodi = false;

  constructor(
    private elementRef: ElementRef,
    private parametriService: ParametriService
  ) {}

  ngOnInit(): void {
    this.parametriService.getAllVrsta().subscribe(groups => {
      this.productGroups = groups;
      groups.forEach(group =>
        this.parametriService.getAllPodVrsta(group).subscribe(pods => {
          this.subgroups[group] = pods;
        })
      );
    });
  }

  toggleProizvodi() {
    this.showProizvodi = !this.showProizvodi;
    if (!this.showProizvodi) {
      this.selectedGroup = null;
    }
  }

  toggleSubgroups(group: string) {
    this.selectedGroup = this.selectedGroup === group ? null : group;
  }

  goToGroup(path: string) {
    const formatted = path.replaceAll(' ', '_');
    this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.ruter.navigate(['/', formatted]);
  });
  }

  goToSubGroup(group: string, subgroup: string) {
    const formattedGroup = group.replaceAll(' ', '_');
    const formattedSubgroup = subgroup.replaceAll(' ', '_');
    this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.ruter.navigate(['/', formattedGroup, formattedSubgroup]);
    });
  }

  goToPage(path: string) {
    window.location.href = path;
  }

  formatPodVrsta(podVrsta: string): string {
    return podVrsta.trim().split(' ').join('_');
  }

  closeSidebar() {
    this.isOpen = false;
    this.showProizvodi = false;
    this.selectedGroup = null;
    this.closed.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.isOpen) return;
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.closeSidebar();
    }
  }
}
