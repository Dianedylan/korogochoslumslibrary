import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AnswerdialogComponent } from '../answerdialog/answerdialog.component';

// export interface DialogData {
//   correctpercentage: 'progressValue';
// }


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {

  constructor(public dialog: MatDialog) {}

  images = [
    {path:'../../assets/goodboks.jpg', text:'', parag: 'A Haven for Dreamers, Thinkers, and Explorers. Where Stories Spark Smiles.'},
    {path:'../../assets/backpack.jpg', text: 'Join Our Friendly Community', parag: 'Join Our Friendly Community'},
    {path:'../../assets/backpack.jpg', text: '', parag: 'A simple signature by you means the whole world to us'}
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

  quiz=[
    {que:'You can help people, animals or the environment.', answer: true},
    {que:'Charities are organisations that help others.', answer: true},
    {que:'You can give your homework, money or things that you own.', answer: false},
    {que:'Volunteering is when you give your time to help others', answer: true},
    {que:'Walking dogs at an animal shelter is a way of fundraising.', answer: false},
    {que:'Fundraising is when you collect food to help others.', answer: false},
    {que:'You can make cakes or biscuits to eat to collect money for a charity.', answer: false}
  ];

  finished = false;
  correctAnswers = 0;

  calculateProgress() {
    const totalQuestions = this.quiz.length;
    const progressValue = (this.correctAnswers / totalQuestions) * 100;
    return progressValue.toFixed(2);
  }

  userAnsweredCorrectly(answer: boolean) {
    if (!this.finished) {
      if (answer) {
        this.correctAnswers++;
      }
    }
  }

  finishQuiz() {
    const percentage = this.calculateProgress();
    const message = `You answered ${percentage}% of the questions correctly.`;
    alert(message);
    this.finished = true;
  }

  tryAgain() {
    this.finished = false;
    this.correctAnswers = 0;
  }

  // openDialog() {
  //   this.dialog.open(AnswerdialogComponent, {
  //     // data: {
  //     //   correctpercentage: 'progressValue',
  //     // },
  //   });
  // }


  hideArrows=true;


}
