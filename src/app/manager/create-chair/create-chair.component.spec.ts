import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChairComponent } from './create-chair.component';

describe('CreateChairComponent', () => {
  let component: CreateChairComponent;
  let fixture: ComponentFixture<CreateChairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
