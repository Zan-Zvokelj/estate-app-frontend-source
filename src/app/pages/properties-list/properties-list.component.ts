import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import this
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Property } from '../../models/property';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-properties-list',
  providers: [ApiCallService],
  templateUrl: './properties-list.component.html',
  imports: [CommonModule, HttpClientModule, RouterModule], // Add HttpClientModule here
})
export class PropertiesListComponent implements OnInit {
  properties: Property[] = [];
  

  constructor(private apiService: ApiCallService, private router: Router) {}

  ngOnInit() {
    this.loadPropertyList();
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

  deleteProperty(PropertyId: number) {
    this.apiService.deleteProperty(PropertyId).subscribe({
      next: () => {
        console.log('Property deleted');
        this.loadPropertyList();
      },
      error: (err) => {
        console.error('Error deleting property:', err);
      },
    });
  }


updateProperty(propertyId: number) {
this.router.navigate(['/new-property', { id: propertyId }]);
}

}
