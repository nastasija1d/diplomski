import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-double-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './double-slider.component.html',
  styleUrl: './double-slider.component.css',
})
export class DoubleSliderComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  ruta = inject(ActivatedRoute);
  lowerValue: number;
  upperValue: number;

  constructor() {}

  ngOnInit(): void {
    this.lowerValue = this.min;
    this.upperValue = this.max;
    this.ruta.queryParams.subscribe((params) => {
      this.lowerValue = params['minCena'] ? +params['minCena'] : this.min; // Čitanje minCena
      this.upperValue = params['maxCena'] ? +params['maxCena'] : this.max; // Čitanje maxCena
    });
    this.updateSliderStyle();
  }

  onInput(): void {
    if (this.lowerValue > this.upperValue) {
      // Zamena vrednosti ako donja pređe preko gornje
      const temp = this.lowerValue;
      this.lowerValue = this.upperValue;
      this.upperValue = temp;
    }
    this.updateSliderStyle();
  }

  // @Output() valuesSubmitted = new EventEmitter<{
  //   lower: number;
  //   upper: number;
  // }>();

  // emitValues(): void {
  //   this.valuesSubmitted.emit({
  //     lower: this.lowerValue,
  //     upper: this.upperValue,
  //   });
  // }

  updateSliderStyle(): void {
    const lowerPercent =
      ((this.lowerValue - this.min) / (this.max - this.min)) * 100;
    const upperPercent =
      ((this.upperValue - this.min) / (this.max - this.min)) * 100;
    const sliderTrack = document.querySelector('.slider-track') as HTMLElement;
    if (sliderTrack) {
      sliderTrack.style.background = `linear-gradient(to right, #ccc ${lowerPercent}%, #2196F3 ${lowerPercent}%, #2196F3 ${upperPercent}%, #ccc ${upperPercent}%)`;
    }
  }
}
