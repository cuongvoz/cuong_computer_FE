import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMouseComponent } from './create-mouse.component';

describe('CreateMouseComponent', () => {
  let component: CreateMouseComponent;
  let fixture: ComponentFixture<CreateMouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
