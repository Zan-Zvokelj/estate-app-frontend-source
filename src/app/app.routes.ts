import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BookTourComponent } from './pages/book-tour/book-tour.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPropertyComponent } from './pages/new-property/new-property.component';
import { PropertiesListComponent } from './pages/properties-list/properties-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'properties-list', component: PropertiesListComponent }, // Properties List
  { path: 'new-property', component: NewPropertyComponent }, // New Property
  { path: 'profile', component: ProfileComponent }, // Profile
  { path: 'about-us', component: AboutComponent }, // About Us
  { path: 'support', component: SupportComponent }, // Support
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'book-tour', component: BookTourComponent },
];
