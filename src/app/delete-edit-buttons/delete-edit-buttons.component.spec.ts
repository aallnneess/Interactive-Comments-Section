import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEditButtonsComponent } from './delete-edit-buttons.component';

describe('DeleteEditButtonsComponent', () => {
  let component: DeleteEditButtonsComponent;
  let fixture: ComponentFixture<DeleteEditButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEditButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEditButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
