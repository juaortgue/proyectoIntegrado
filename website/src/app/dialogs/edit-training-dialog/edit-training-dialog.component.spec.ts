import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingDialogComponent } from './edit-training-dialog.component';

describe('EditTrainingDialogComponent', () => {
  let component: EditTrainingDialogComponent;
  let fixture: ComponentFixture<EditTrainingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
