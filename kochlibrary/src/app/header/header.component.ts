import { Component, HostListener} from '@angular/core';
import { Route, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  styles: [`
    .active-link {
      color: #fff; 
      font-weight: bold;
    }
  `]
})

export class HeaderComponent {
  
  isSubMenuVisible = false;
  isScrolledUp = false;

  
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolledUp = window.scrollY > 0;
  }

  showSubMenu() {
    this.isSubMenuVisible = true;
  }

  hideSubMenu() {
    this.isSubMenuVisible = false;
  }
}
