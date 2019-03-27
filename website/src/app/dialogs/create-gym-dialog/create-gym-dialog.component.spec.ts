import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGymDialogComponent } from './create-gym-dialog.component';

describe('CreateGymDialogComponent', () => {
  let component: CreateGymDialogComponent;
  let fixture: ComponentFixture<CreateGymDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGymDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGymDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
