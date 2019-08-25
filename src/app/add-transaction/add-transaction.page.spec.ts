import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionPage } from './add-transaction.page';

describe('AddTransactionPage', () => {
  let component: AddTransactionPage;
  let fixture: ComponentFixture<AddTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
