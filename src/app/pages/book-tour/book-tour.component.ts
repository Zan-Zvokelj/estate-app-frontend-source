import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-book-tour',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css'], // If you prefer using CSS modules
})
export class BookTourComponent {
  // Booking details bound to the form
  booking = {
    date: '',
    time: '',
    name: '',
    phone: '',
  };

  // EmailJS service, template, and public user ID
  serviceID = 'service_qilj1ej'; // Your Service ID
  templateID = 'template_ddwksrp'; // Your Template ID
  userID = 'hJa2BqXity0oPlc-0'; // Your Public User ID

  // List of available times
  availableTimes: string[] = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
  ];

  property: any; // Store the selected property

  constructor(private router: Router, private route: ActivatedRoute) {
    // Accessing the property passed from the router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.property = navigation.extras.state['property'];
    }
  }

  // Method to book a tour
  bookTour(): void {
    if (
      !this.booking.date ||
      !this.booking.time ||
      !this.booking.name ||
      !this.booking.phone
    ) {
      alert('Please fill out all fields!');
      return;
    }

    const templateParams = {
      date: this.booking.date,
      time: this.booking.time,
      name: this.booking.name,
      phone: this.booking.phone,
    };

    emailjs
      .send(this.serviceID, this.templateID, templateParams, this.userID)
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Tour successfully booked! We will contact you shortly.');
        },
        (error) => {
          console.error('FAILED...', error);
          alert('There was an error booking your tour. Please try again.');
        }
      );
  }

  goBack() {
    this.router.navigate(['/']); // Navigate back to the previous route or home page
  }
}
