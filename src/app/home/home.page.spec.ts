import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let afAuth: AngularFireAuth;

  const angularFireAuthStub = {
    auth: {
      signOut: () => {}
    }
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    afAuth = TestBed.get(AngularFireAuth);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('ion-title').textContent
    ).toContain('Promise to Pay');
  });
});
