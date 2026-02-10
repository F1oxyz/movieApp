import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-animes',
  imports: [],
  templateUrl: './animes.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Animes { }
