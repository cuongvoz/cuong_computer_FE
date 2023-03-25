import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePCComponent } from './create-pc.component';

describe('CreatePCComponent', () => {
  let component: CreatePCComponent;
  let fixture: ComponentFixture<CreatePCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
