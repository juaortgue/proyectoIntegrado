import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingDialogComponent } from './create-training-dialog.component';

describe('CreateTrainingDialogComponent', () => {
  let component: CreateTrainingDialogComponent;
  let fixture: ComponentFixture<CreateTrainingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTrainingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
