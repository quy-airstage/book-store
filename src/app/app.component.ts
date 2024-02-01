import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Assignment';
  showHeaderAndFooter = true;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let check = ['admin', 'login'];
        let count = 0;
        const currentPath = this.router.url;
        check.forEach((item) => {
          if (currentPath.includes(item)) {
            count = 1;
            return;
          }
        });
        count == 1
          ? (this.showHeaderAndFooter = false)
          : (this.showHeaderAndFooter = true);
      }
    });
  }
}
