import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // const rellax = new Rellax('.rellax', {
    //   speed: -40, 
    // });
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.querySelector('#' + fragment);
        console.log('elementscroll', fragment);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // block: 'start', inline: 'nearest'
        }
      }
    });
  }
}
