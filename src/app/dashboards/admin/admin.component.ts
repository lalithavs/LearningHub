import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Admin Dashboard',
            cols: 1,
            rows: 1,
            content: 'Please click the links',
          },
          { title: 'Card 2', cols: 1, rows: 1, content: '' },
          { title: 'Card 3', cols: 1, rows: 1, content: '' },
          { title: 'Card 4', cols: 1, rows: 1, content: '' },
        ];
      }

      return [
        {
          title: 'Admin Dashboard',
          cols: 2,
          rows: 1,
          content: 'Please click the links',
        },
        { title: 'Card 2', cols: 1, rows: 1, content: '' },
        { title: 'Card 3', cols: 1, rows: 2, content: '' },
        { title: 'Card 4', cols: 1, rows: 1, content: '' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
