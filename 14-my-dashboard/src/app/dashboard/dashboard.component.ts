import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component'; // tsconfig.json -> adding "paths": {"@shared/*": ["./src/app/shared/*"] },

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SideMenuComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
