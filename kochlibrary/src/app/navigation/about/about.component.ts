import { Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  images = [
    {path:'../../assets/bookshelf.jpg', text:'', parag: 'A Haven for Dreamers, Thinkers, and Explorers. Where Stories Spark Smiles.'},
    {path:'../../assets/boyreading.jpeg', text: '', parag: 'Join Our Friendly Community'},
    {path:'../../assets/talkb4sleep.jpeg', text: '', parag: 'A simple signature by you means the whole world to us'}
  ];

  activeSlideIndex = 0;
}
