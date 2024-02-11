import { Component, HostListener} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
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

  // whatonecando!: { name: string};
  volunteer!: { name2: string; };
  fundraise!: { name3: string; };

  constructor(private route: ActivatedRoute, 
              private router: Router,
              // public responsive: BreakpointObserver
              ) {}

  ngOnInit() {
//     this.responsive
// .observe([Breakpoints.HandsetPortrait])
// .subscribe((state: BreakpointState) => {
// if (state.matches) {
// console.log(
// 'This is the Handset Portrait point at max-width: 599.98 px and portrait orientation.'
// );
// }
// });
    // this.whatonecando = {
    //   name: this.route.snapshot.params['name'],
    //   name2: this.route.snapshot.params['name2'],
    //   name3: this.route.snapshot.params['name3'],
    // };

    this.route.params.subscribe(
      (params:Params)=>{
        // this.whatonecando.name = params['name'];
        this.volunteer.name2 = params['name2'];
        this.fundraise.name3 = params['name3'];
      }
    );
    
    // this.route.fragment.subscribe(fragment => {
    //   if (fragment) {
    //     this.scrollToElement(fragment);
    //   }
    // });
  }
  

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
