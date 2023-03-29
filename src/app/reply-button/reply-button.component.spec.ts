import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyButtonComponent } from './reply-button.component';

describe('ReplyButtonComponent', () => {
  let component: ReplyButtonComponent;
  let fixture: ComponentFixture<ReplyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
