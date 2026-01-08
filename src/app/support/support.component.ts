import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router module
import emailjs from 'emailjs-com';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-support',
  imports: [
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    FooterComponent,
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  supportForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // EmailJS service, template, and public user ID
  serviceID = 'service_qilj1ej'; // Your Service ID
  templateID = 'template_ddwksrp'; // Your Template ID
  userID = 'hJa2BqXity0oPlc-0'; // Your Public User ID

  constructor(private router: Router) {}

  // Submit handler for the form
  onSubmit() {
    console.log('Support Enquiry Submitted:', this.supportForm);

    const templateParams = {
      name: this.supportForm.name,
      email: this.supportForm.email,
      subject: this.supportForm.subject,
      message: this.supportForm.message,
    };

    emailjs
      .send(this.serviceID, this.templateID, templateParams, this.userID)
      .then(
        (response) => {
          console.log('Email sent successfully', response);
          alert('Your enquiry has been submitted!');

          // Reset the form
          this.supportForm = {
            name: '',
            email: '',
            subject: '',
            message: '',
          };

          // Optional: Navigate to a different page (e.g., Home or Thank You page)
          // this.router.navigate(['/thank-you']);  // Uncomment this if you have a thank-you page
        },
        (error) => {
          console.error('Error sending email', error);
          alert('There was an error sending your enquiry. Please try again.');
        }
      );
  }
}
