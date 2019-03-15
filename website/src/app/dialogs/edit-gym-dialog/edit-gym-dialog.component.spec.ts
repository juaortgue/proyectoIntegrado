import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGymDialogComponent } from './edit-gym-dialog.component';

describe('EditGymDialogComponent', () => {
  let component: EditGymDialogComponent;
  let fixture: ComponentFixture<EditGymDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGymDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGymDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
