import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-about',
  imports: [
    RouterModule,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    RouterModule,
  ], // Remove this line
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
