import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ParametriService } from '../1services/parametri.service';

@Component({
  selector: 'app-vlager-brend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vlager-brend.component.html',
  styleUrl: './vlager-brend.component.css'
})
export class VlagerBrendComponent implements OnInit {

  servis = inject(ParametriService)
  marke : string[]

  ngOnInit(): void {
    this.servis.getAllMarka().subscribe((data)=>{
      this.marke = data
    })
  }

}
