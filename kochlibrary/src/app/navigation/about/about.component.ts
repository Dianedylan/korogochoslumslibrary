import { Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  images = [
    {path:'../../assets/aboutuspic3.jpg', text:'When in doubt Check a book out', parag: 'Helping others is a great thing to do. You can learn new things and have fun.'},
    {path:'../../assets/aboutuspic2.jpg', text: 'Join Our Friendly Community', parag: ' Being of help makes you feel good too! How can you help today?'},
    {path:'../../assets/aboutuspic3.jpg', text: 'No child labour in Korogocho', parag: 'A simple signature by you means the whole world to us'}
  ];

  activeSlideIndex = 0;
}
