import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUserOptionsComponent } from './nav-user-options.component';

describe('NavUserOptionsComponent', () => {
  let component: NavUserOptionsComponent;
  let fixture: ComponentFixture<NavUserOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavUserOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUserOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
