import { TestBed } from '@angular/core/testing';

import { PaymentdetailsService } from './paymentdetails.service';

describe('PaymentdetailsService', () => {
  let service: PaymentdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
