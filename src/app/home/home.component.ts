import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Property } from '../models/property';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiCallService } from '../services/api-call.service';
import { AuthService } from '../services/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  providers: [AuthService, ApiCallService],
  imports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  properties: Property[] = [];
  property: Property | undefined;
  selectedProperty: any = null; // This will hold the property object of the clicked property
  selectedImage: string = '';
  imageGallery: string[] = [];
  username: string = '';
  loggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiService: ApiCallService
  ) {}

  ngOnInit(): void {
    this.updateGallery();
    this.username = this.authService.getUsername();
    this.loadPropertyList();
    this.authService.checkLoginStatus(); // Ensure initial login state is checked
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
      console.log('Logged In Status:', this.loggedIn); // Debugging log
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getUsername(): string {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser).user.username;
    }
    return '';
  }

  loadPropertyList() {
    this.apiService.getProperty().subscribe({
      next: (propertiesAPI: Property[]) => {
        this.properties = propertiesAPI;
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      },
    });
  }

  selectProperty(property: any): void {
    this.selectedProperty = property;
    this.updateGallery();
  }

  updateGallery() {
    if (
      this.selectedProperty?.home_type === 'Apartment' ||
      this.selectedProperty?.home_type === 'Studio'
    ) {
      this.imageGallery = [
        '/estate-app-frontend/assets/apartment2.jpg',
        '/estate-app-frontend/assets/apartmentinside.jpg',
        '/estate-app-frontend/assets/apartmentinside.jpg',
        '/estate-app-frontend/assets/apartmentinside.jpg',
      ];
    } else {
      this.imageGallery = [
        '/estate-app-frontend/assets/house.jpg',
        '/estate-app-frontend/assets/house2.jpg',
        '/estate-app-frontend/assets/house2.jpg',
        '/estate-app-frontend/assets/house2.jpg',
      ];
    }
    this.selectedImage = this.imageGallery[0]; // Set default main image
  }
}
