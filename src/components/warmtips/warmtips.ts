import { Component } from '@angular/core';

/**
 * Generated class for the WarmtipsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'warmtips',
  templateUrl: 'warmtips.html'
})
export class WarmtipsComponent {

  text: string;

  constructor() {
    console.log('Hello WarmtipsComponent Component');
    this.text = 'Hello World';
  }

}
