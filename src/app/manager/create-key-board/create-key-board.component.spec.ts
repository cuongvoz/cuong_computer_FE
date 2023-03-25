import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKeyBoardComponent } from './create-key-board.component';

describe('CreateKeyBoardComponent', () => {
  let component: CreateKeyBoardComponent;
  let fixture: ComponentFixture<CreateKeyBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKeyBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKeyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
