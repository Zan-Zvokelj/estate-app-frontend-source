import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [AuthService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loggedIn = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form controls first
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      gsm: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.authService.checkLoginStatus(); // Ensure initial login state is checked

    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
      console.log('Logged In Status:', this.loggedIn);

      if (this.loggedIn) {
        // Fetch and pre-fill the form with the profile data if logged in
        const profileData = this.authService.getProfileData();
        if (profileData) {
          this.profileForm.patchValue(profileData);
        }
      } else {
        // Reset form if not logged in
        this.profileForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid || this.profileForm.invalid) {
      const formData = this.profileForm.value;
      this.authService.storeProfileData(formData); // Save the form data to localStorage
      console.log('Profile saved:', formData);

      // After saving, pre-fill the form again with updated data from localStorage
      const updatedProfileData = this.authService.getProfileData();
      if (updatedProfileData) {
        this.profileForm.patchValue(updatedProfileData); // Ensure the form is updated with the saved data
      }

      // Optionally navigate after saving
      this.router.navigate(['']);
    } else {
      console.log('Form is invalid');
    }
  }

  logout() {
    this.authService.logout(); // Call the logout method from AuthService
    this.profileForm.setValue({
      name: '',
      surname: '',
      birthday: '',
      gender: '',
      address: '',
      zip: '',
      gsm: '',
      email: '',
    });
    this.router.navigate(['/login']); // Navigate to the login page or another appropriate page
  }
}
