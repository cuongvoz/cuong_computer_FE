import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaptopComponent } from './create-laptop.component';

describe('CreateLaptopComponent', () => {
  let component: CreateLaptopComponent;
  let fixture: ComponentFixture<CreateLaptopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLaptopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
