import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'layout-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './layout-page.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent { }
