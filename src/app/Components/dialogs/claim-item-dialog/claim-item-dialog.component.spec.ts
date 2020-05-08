import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimItemDialogComponent } from './claim-item-dialog.component';

describe('ClaimItemDialogComponent', () => {
  let component: ClaimItemDialogComponent;
  let fixture: ComponentFixture<ClaimItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
