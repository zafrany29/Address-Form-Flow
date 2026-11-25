import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddressService, City } from '../address.service';
import { nonBlank } from '../shared/non-blank.validator';

@Component({
  selector: 'app-address-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly addresses = inject(AddressService);
  readonly cities = signal<City[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal(false);
  readonly form = this.fb.nonNullable.group({
    username: ['', nonBlank],
    city: ['', Validators.required],
  });

  constructor() {
    if (this.addresses.draft) this.form.setValue(this.addresses.draft);
    this.loadCities();
  }

  loadCities() {
    this.loading.set(true);
    this.loadError.set(false);
    this.addresses.getCities().subscribe({
      next: (cities) => {
        this.cities.set(cities);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  next() {
    if (this.form.invalid || this.loading() || this.loadError()) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.addresses.draft = { username: value.username.trim(), city: value.city };
    void this.router.navigate(['/confirmation']);
  }
}
