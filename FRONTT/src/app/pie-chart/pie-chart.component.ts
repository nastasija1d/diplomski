import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Proizvodjac } from '../1models/proizvodjac';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges {
  @Input() data: Proizvodjac[] = [];
  @Input() width = 400;
  @Input() height = 400;
  colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AFFC1', '#FF8A5C', '#A9A9FF',
    '#00CED1', '#FFD700', '#ADFF2F', '#FF4500', '#8A2BE2', '#00FA9A', '#DC143C', '#7B68EE', '#00BFFF',
    '#FFDAB9', '#20B2AA', '#9370DB', '#3CB371', '#FFA07A', '#6A5ACD', '#48D1CC', '#C71585', '#FF6347',
    '#1E90FF', '#32CD32', '#BA55D3', '#66CDAA', '#FFB6C1', '#8B008B', '#40E0D0', '#FF7F50', '#7FFF00',
    '#D2691E', '#87CEFA', '#6B8E23', '#FF1493', '#4169E1', '#00FF7F', '#B22222', '#DA70D6', '#5F9EA0',
    '#FFA500', '#228B22', '#DB7093', '#4682B4', '#9ACD32', '#F08080'
  ];
  arcs: Array<{ startAngle: number; endAngle: number; color: string; naziv: string; broj: number }> = [];

  hoveredIndex: number | null = null;
  tooltipVisible = false;
  legendHeight = 60;
  tooltipX = 0;
  tooltipY = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.calculateArcs();
    }
  }

  private calculateArcs() {
    this.arcs = [];
    const total = this.data.reduce((sum, item) => sum + item.broj, 0);
    let acc = 0;
    if (this.data.length === 1) {
      const item = this.data[0];
      // Prvi polukrug: 0°–180°
      this.arcs.push({
        startAngle: 0,
        endAngle: 359.9999,
        color: this.colors[0],
        naziv: item.naziv,
        broj: item.broj
      });
      
      return;
    }
    this.arcs = this.data.map((item, i) => {
      const slice = (item.broj / total) * 360;
      const arc = {
        startAngle: acc,
        endAngle: acc + slice,
        color: this.colors[i % this.colors.length],
        naziv: item.naziv,
        broj: item.broj
      };
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
    this.hoveredIndex = idx;
    this.tooltipVisible = true;
    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY;
  }

  onMouseLeave() {
    this.hoveredIndex = null;
    this.tooltipVisible = false;
  }

  
  moveTooltip(event: MouseEvent) {
    this.tooltipX = event.clientX + 10; // 10px desno od pokazivača
    this.tooltipY = event.clientY + 10; // 10px dole od pokazivača
  }

  getRadius(idx: number): number {
    const base = Math.min(this.width, this.height) / 2;
    return this.hoveredIndex === idx ? base * 1.1 : base;
  }
}
