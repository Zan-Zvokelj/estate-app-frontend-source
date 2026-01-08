export interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  state: string;
  zipcode: string; // Zipcode is better as 20 chars, not 100
  price: number; // Use number for prices
  description: string;
  area: number; // Same as above
  parking: string; // Limit length to 10 (enough for choices)
  bedrooms: number;
  bathrooms: number;
  sale_type: string; // Limit length to 20 (enough for choices)
  home_type: string; // Same as above
  timestamp: string;
}
