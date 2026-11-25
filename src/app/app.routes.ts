import { Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
export const routes: Routes = [
  { path: '', component: AddressComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '' },
];
