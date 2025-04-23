import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges {
  @Input() data: [string, number][] = [];
  @Input() width = 400;
  @Input() height = 400;

  colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AFFC1', '#FF8A5C', '#A9A9FF'];
  arcs: Array<{ startAngle: number; endAngle: number; color: string; label: string; value: number }> = [];

  hoveredIndex: number | null = null;
  legendHeight = 60;
  tooltipX = 0;
  tooltipY = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.calculateArcs();
    }
  }

  private calculateArcs() {
    const total = this.data.reduce((sum, [, v]) => sum + v, 0);
    let acc = 0;
    this.arcs = this.data.map(([label, value], i) => {
      const slice = (value / total) * 360;
      const arc = { startAngle: acc, endAngle: acc + slice, color: this.colors[i % this.colors.length], label, value };
      acc += slice;
      return arc;
    });
  }

  polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(cx, cy, radius, endAngle);
    const end = this.polarToCartesian(cx, cy, radius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
  }

  onMouseEnter(event: MouseEvent, idx: number) {
    console.log(event);
    this.hoveredIndex = idx;
    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY;
  }

  onMouseLeave() {
    this.hoveredIndex = null;
  }

  getRadius(idx: number): number {
    const base = Math.min(this.width, this.height) / 2;
    return this.hoveredIndex === idx ? base * 1.1 : base;
  }
}