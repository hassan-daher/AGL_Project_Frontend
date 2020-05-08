import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLostItemDialogComponent } from './add-lost-item-dialog.component';

describe('AddLostItemDialogComponent', () => {
  let component: AddLostItemDialogComponent;
  let fixture: ComponentFixture<AddLostItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLostItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLostItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
