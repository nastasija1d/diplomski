import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-uputstvo',
  standalone: true,
  imports: [],
  templateUrl: './uputstvo.component.html',
  styleUrl: './uputstvo.component.css'
})
export class UputstvoComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

 ngAfterViewInit(): void {
  const steps: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('.order-step');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const indexAttr = entry.target.getAttribute('data-index');
        const delay = indexAttr ? parseInt(indexAttr) * 0.3 : 0;

        const element = entry.target as HTMLElement;
        element.style.transition = `opacity 0.6s ${delay}s ease-out, transform 0.6s ${delay}s ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';

        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  steps.forEach(step => observer.observe(step));
}

}