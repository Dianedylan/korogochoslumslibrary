import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  ngOnInit() {
    const rellax = new Rellax('.rellax', {
      speed: -40, 
    });
  }
}
