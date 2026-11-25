import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AddressService } from './address.service';
import { AddressComponent } from './address/address.component';
import { provideRouter } from '@angular/router';
import { FormControl } from '@angular/forms';
import { nonBlank } from './shared/non-blank.validator';

describe('nonBlank', () => {
  it('rejects empty or whitespace-only names and accepts a name with spaces', () => {
    expect(nonBlank(new FormControl(''))).toEqual({ required: true });
    expect(nonBlank(new FormControl('   '))).toEqual({ required: true });
    expect(nonBlank(new FormControl(' John '))).toBeNull();
  });
});

describe('AddressComponent', () => {
  it('shows cities after the request completes without another user action', async () => {
    TestBed.configureTestingModule({
      imports: [AddressComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(AddressComponent);
    await fixture.whenStable();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('http://localhost:3000/cities').flush([{ id: 1, name: 'London' }]);
    await fixture.whenStable();
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.options[0].textContent).toContain('Select your city');
    expect(select.options[1].textContent).toContain('London');
    http.verify();
  });
});

describe('AddressService', () => {
  it('posts the address to the mock API', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const service = TestBed.inject(AddressService);
    const http = TestBed.inject(HttpTestingController);
    const address = { username: 'John', city: 'London' };
    service.submit(address).subscribe();
    const request = http.expectOne('http://localhost:3000/submit');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(address);
    request.flush({ success: true });
    http.verify();
  });
});
