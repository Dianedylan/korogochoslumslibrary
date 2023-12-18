import { Component } from '@angular/core';
import { Route, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSubMenuVisible = false;

  showSubMenu() {
    this.isSubMenuVisible = true;
  }

  hideSubMenu() {
    this.isSubMenuVisible = false;
  }

  
}
