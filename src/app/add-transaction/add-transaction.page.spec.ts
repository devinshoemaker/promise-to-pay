import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonicModule, AlertController } from '@ionic/angular';
import { of } from 'rxjs';

import { AddTransactionPage } from './add-transaction.page';
import { ContactService } from '../services/contact.service';

describe('AddTransactionPage', () => {
  let component: AddTransactionPage;
  let fixture: ComponentFixture<AddTransactionPage>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const angularFirestoreStub = {};
    const angularFireAuthStub = {
      user: of({ uid: 'user-id' })
    };

    TestBed.configureTestingModule({
      declarations: [AddTransactionPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, IonicModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get contacts on init', () => {
    // expect(component.userId)
  });
});
