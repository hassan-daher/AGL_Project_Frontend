import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLoginWarningComponent } from './facebook-login-warning.component';

describe('FacebookLoginWarningComponent', () => {
  let component: FacebookLoginWarningComponent;
  let fixture: ComponentFixture<FacebookLoginWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookLoginWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLoginWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
