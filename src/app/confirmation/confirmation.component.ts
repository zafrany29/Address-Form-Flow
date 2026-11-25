import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-confirmation-page',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  private readonly addresses = inject(AddressService);
  private readonly router = inject(Router);
  readonly address = this.addresses.draft;
  readonly sending = signal(false);
  readonly error = signal(false);

  constructor() {
    if (!this.address) void this.router.navigateByUrl('/');
  }

  send() {
    if (!this.address || this.sending()) return;
    this.sending.set(true);
    this.error.set(false);
    this.addresses.submit(this.address).subscribe({
      next: () => {
        this.addresses.draft = null;
        void this.router.navigateByUrl('/');
      },
      error: () => {
        this.sending.set(false);
        this.error.set(true);
      },
    });
  }
}
