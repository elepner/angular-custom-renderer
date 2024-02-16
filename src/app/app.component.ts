import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',

  template: `
    <h1>Welcome to {{title}}!</h1>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-custom-renderer';
}
