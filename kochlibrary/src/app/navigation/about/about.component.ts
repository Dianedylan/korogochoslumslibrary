import { Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  images = [
    {path:'../../assets/akinyiwithbook.jpg', text:'', parag: 'A Haven for Dreamers, Thinkers, and Explorers. Where Stories Spark Smiles.'},
    {path:'../../assets/backpack.jpg', text: '', parag: 'Join Our Friendly Community'},
    {path:'../../assets/backpack.jpg', text: '', parag: 'A simple signature by you means the whole world to us'}
  ];

  activeSlideIndex = 0;
}
