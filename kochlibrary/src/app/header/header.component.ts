import { Component, HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {ExpandMore} from '@mui/icons-material';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  // ngOnInit() {
  //   this.route.fragment.subscribe(fragment => {
  //     if (fragment) {
  //       this.scrollToElement(fragment);
  //     }
  //   });
  // }

  // scrollToElement(elementId: string): void {
  //   const element = document.getElementById(elementId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  //   }
  // }

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
