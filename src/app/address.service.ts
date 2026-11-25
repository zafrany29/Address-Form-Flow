import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
export interface City {
  id: number;
  name: string;
}
export interface Address {
  username: string;
  city: string;
}
@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly http = inject(HttpClient);
  private readonly api = 'http://localhost:3000';
  draft: Address | null = null;

  getCities() {
    return this.http.get<City[]>(this.api + '/cities');
  }

  submit(address: Address) {
    return this.http.post<{ success: boolean }>(this.api + '/submit', address);
  }
}
