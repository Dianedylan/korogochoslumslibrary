import { Component } from '@angular/core';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {

  images = [
    '../../assets/akinyiwithbook.jpg',
    '../../assets/backpack.jpg',
    '../../assets/backpack.jpg',
  ];
  activeSlideIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 15000);
  }

  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.images.length;
  }

  selectSlide(index: number) {
    this.activeSlideIndex = index;
  }
}
