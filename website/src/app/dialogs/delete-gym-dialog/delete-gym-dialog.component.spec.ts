import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGymDialogComponent } from './delete-gym-dialog.component';

describe('DeleteGymDialogComponent', () => {
  let component: DeleteGymDialogComponent;
  let fixture: ComponentFixture<DeleteGymDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGymDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGymDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
