import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Property } from '../../models/property';
import { ApiCallService } from '../../services/api-call.service';
import { HomeService } from '../../services/home.service';
import { ParkingService } from '../../services/parking.service';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-new-property',
  providers: [ApiCallService, SaleService, HomeService, ParkingService],
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.css'],
})
export class NewPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  sales!: string[];
  homes!: string[];
  parkings!: string[];
  isUpdateMode = false;
  propertyId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiCallService,
    private saleService: SaleService,
    private HomeService: HomeService,
    private parkingService: ParkingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadSales();
    this.loadHomes();
    this.loadParking();
    this.propertyId = this.route.snapshot.paramMap.get('id');

    if (this.propertyId) {
      this.isUpdateMode = true;
      this.loadPropertyDetails(this.propertyId);
    }
  }

  createForm() {
    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      description: ['', Validators.required],
      area: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      parking: ['', Validators.required],
      bedrooms: ['', [Validators.required, Validators.min(0)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]],
      sale_type: ['', Validators.required],
      home_type: ['', Validators.required],
    });
  }

  goBack() {
    this.router.navigate(['/properties-list']);
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const propertyData: Property = this.propertyForm.value;

      if (this.isUpdateMode) {
        this.apiService
          .updateProperty(this.propertyId!, propertyData)
          .subscribe({
            next: (response) => {
              this.router.navigate(['/properties-list']);
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              console.log(propertyData);
            },
          });
      } else {
        this.apiService.addProperty(propertyData).subscribe({
          next: (response) => {
            this.propertyForm.reset();
            this.router.navigate(['/properties-list']);
          },
          error: (error: any) => {
            console.log(error);
          },
          complete: () => {
            console.log(propertyData);
          },
        });
      }
    }
  }

  loadSales() {
    this.saleService.getSales().subscribe((sales: string[]) => {
      this.sales = sales;
      console.log(sales);
    });
  }

  loadHomes() {
    this.HomeService.getHomes().subscribe((homes: string[]) => {
      this.homes = homes;
      console.log(homes);
    });
  }
  loadParking() {
    this.parkingService.getParking().subscribe((parkings: string[]) => {
      this.parkings = parkings;
      console.log(parkings);
    });
  }

  loadPropertyDetails(propertyId: string) {
    this.apiService.getPropertyById(propertyId).subscribe({
      next: (property: Property) => {
        this.propertyForm.patchValue(property);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
