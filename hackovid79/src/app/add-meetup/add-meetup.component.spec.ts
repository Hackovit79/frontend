import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetupComponent } from './add-meetup.component';

describe('AddMeetupComponent', () => {
  let component: AddMeetupComponent;
  let fixture: ComponentFixture<AddMeetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
